import React, { Component } from 'react';
import {Card, CardHeader, CardBody, CardTitle, CardText, Row, Col, Label} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ArcElement
} from 'chart.js';
import {Bar, Line, Pie} from "react-chartjs-2";
import './CSS/report.scss';

ChartJS.register(
    CategoryScale, LinearScale, BarElement, PointElement, LineElement, 
    ArcElement, Title, Tooltip, Filler, Legend
);

const thong_ke_hop_dong_options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Trong năm'
        }
    }
}

const thong_ke_ngan_chan_giai_toa_options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Trong năm'
        }
    }
}


const labels = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12', 
];

const DailyReportComponent = ({ newReports }) => {
    const { 
        allTime, newContractByMonthly, newAssetPreventionByMonthly, newAssetReleaseByMonthly,
        newContractDailyTotal = '', newAssetPreventionDailyTotal = '', newAssetReleaseDailyTotal = '', newThuHoiGCNDailyTotal = '',
        newContractWeeklyTotal = '', newAssetPreventionWeeklyTotal = '', newAssetReleaseWeeklyTotal = '', newThuHoiGCNWeeklyTotal = '',
        newContractMonthlyTotal = '', newAssetPreventionMonthlyTotal = '', newAssetReleaseMonthlyTotal = '', newThuHoiGCNMonthlyTotal = '',
        top5NewContractGroupBySubContractType, top5NewContractGroupBySubContractTypePercentage,
    } = newReports || {};

    let hop_dong_datas = newContractByMonthly && newContractByMonthly.map(item => item.count);
    let ngan_chan_datas = newAssetPreventionByMonthly && newAssetPreventionByMonthly.map(item => item.count);
    let giai_toa_datas = newAssetReleaseByMonthly && newAssetReleaseByMonthly.map(item => item.count);
    let ngan_chan_giai_toa_datas = ngan_chan_datas && ngan_chan_datas.map((item, idx) => item + giai_toa_datas[idx]);

    const thong_ke_hop_dong_data = {
        labels,
        datasets: [
            {
                label: 'Tháng',
                data: hop_dong_datas,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]
    }

    const thong_ke_ngan_chan_giai_toa_data = {
        labels,
        datasets: [
            {
                label: 'Tháng',
                data: ngan_chan_giai_toa_datas,
                backgroundColor: '#de711f',
            }
        ]
    }

    let loai_hop_dong_labels = []; 

    loai_hop_dong_labels = top5NewContractGroupBySubContractType && 
                           top5NewContractGroupBySubContractType.map(item => item.name) || [];

    // loai_hop_dong_labels = top5NewContractGroupBySubContractType && 
    //                        top5NewContractGroupBySubContractType.map((item, index) => `${item.name}: ${top5NewContractGroupBySubContractTypePercentage[index]}%`) || [];
    loai_hop_dong_labels.push("Khác");

    let loai_hop_dong_datas = top5NewContractGroupBySubContractTypePercentage;


    const data = {
      labels: loai_hop_dong_labels, //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: loai_hop_dong_datas, //[12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
        <div className="animated fadeIn">
            <Card>
                <CardBody>
                    <Row>
                        <Col md="12">
                            <main role="main" className="col-md-12 ml-sm-auto col-lg-12 my-3">
                                <div className="card-list">
                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-4 col-xl-4 mb-4">
                                            <div className="card___report blue">
                                                <div><h4>HÔM NAY</h4></div>
                                                <div className="d-flex justify-content-between">
                                                    <div className='text-center'>
                                                        <div className="title">HỢP ĐỒNG</div>
                                                        <i className="zmdi zmdi-upload"></i>
                                                        <div className="value">{newContractDailyTotal}</div>
                                                        <div className="stat"><b></b></div>
                                                    </div>
                                                    <div className='text-center'>
                                                        <div className="title">NGĂN CHẶN/GIẢI TOẢ</div>
                                                        <i className="zmdi zmdi-upload"></i>
                                                        <div className="value">{newAssetPreventionDailyTotal + newAssetReleaseDailyTotal}</div>
                                                        <div className="stat"><b></b></div>
                                                    </div>   
                                                    <div className='text-center'>
                                                        <div className="title">THU HỒI/HUỶ</div>
                                                        <i className="zmdi zmdi-upload"></i>
                                                        <div className="value">{newThuHoiGCNDailyTotal}</div>
                                                        <div className="stat"><b></b></div>
                                                    </div>     
                                                </div>
                                             
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4 col-xl-4 mb-4">
                                            <div className="card___report green">
                                                <div><h4>TUẦN NÀY</h4></div>
                                                <div className="d-flex justify-content-between">
                                                    <div className='text-center'>
                                                        <div className="title">HỢP ĐỒNG</div>
                                                        <i className="zmdi zmdi-upload"></i>
                                                        <div className="value">{newContractWeeklyTotal}</div>
                                                        <div className="stat"><b></b></div>
                                                    </div>
                                                    <div className='text-center'>
                                                        <div className="title">NGĂN CHẶN/GIẢI TOẢ</div>
                                                        <i className="zmdi zmdi-upload"></i>
                                                        <div className="value">{newAssetPreventionWeeklyTotal + newAssetReleaseWeeklyTotal}</div>
                                                        <div className="stat"><b></b></div>
                                                    </div>   
                                                    <div className='text-center'>
                                                        <div className="title">THU HỒI/HUỶ</div>
                                                        <i className="zmdi zmdi-upload"></i>
                                                        <div className="value">{newThuHoiGCNWeeklyTotal}</div>
                                                        <div className="stat"><b></b></div>
                                                    </div>     
                                                </div>
                                             
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4 col-xl-4 mb-4">
                                            <div className="card___report orange">
                                                <div><h4>THÁNG NÀY</h4></div>
                                                <div className="d-flex justify-content-between">
                                                    <div className='text-center'>
                                                        <div className="title">HỢP ĐỒNG</div>
                                                        <i className="zmdi zmdi-upload"></i>
                                                        <div className="value">{newContractMonthlyTotal}</div>
                                                        <div className="stat"><b></b></div>
                                                    </div>
                                                    <div className='text-center'>
                                                        <div className="title">NGĂN CHẶN/GIẢI TOẢ</div>
                                                        <i className="zmdi zmdi-upload"></i>
                                                        <div className="value">{newAssetPreventionMonthlyTotal + newAssetReleaseMonthlyTotal}</div>
                                                        <div className="stat"><b></b></div>
                                                    </div>   
                                                    <div className='text-center'>
                                                        <div className="title">THU HỒI/HUỶ</div>
                                                        <i className="zmdi zmdi-upload"></i>
                                                        <div className="value">{newThuHoiGCNMonthlyTotal}</div>
                                                        <div className="stat"><b></b></div>
                                                    </div>     
                                                </div>
                                             
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="projects___report mb-4" style={{maxHeight: '600px', overflow: 'scroll'}}>
                                    <div className="projects-inner">
                                        <header className="projects-header___report">
                                            <div className="title" style={{color: "#76ff03"}}>THỐNG KÊ ĐƠN VỊ</div>
                                            <div className="count" style={{color: "#ffffff"}}>| {allTime && allTime.contractReportDetails && allTime.contractReportDetails.length} đơn vị</div>
                                            <i className="zmdi zmdi-download"></i>
                                        </header>
                                        <table className="projects-table___report">
                                            <thead>
                                                <tr>
                                                    <th>Đơn vị</th>
                                                    <th>Tổng số Hợp đồng</th>
                                                    <th>Người đại diện</th>
                                                    <th>Thuộc huyện</th>
                                                    <th>Địa chỉ</th>
                                                    <th className="text-right">Tình trạng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allTime && allTime.contractReportDetails 
                                                 && allTime.contractReportDetails.map((item, idx) => {
                                                        return (
                                                            <tr key={idx}>
                                                                <td>
                                                                    <p className="text-warning">{item.name}</p>
                                                                    <p></p>
                                                                </td>
                                                                <td>
                                                                    <p>{item.count}</p>
                                                                    <p></p>
                                                                </td>
                                                                <td className="member">
                                                                    <figure><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png" /></figure>
                                                                    <div className="member-info">
                                                                        <p>{item.manager}</p>
                                                                        <p></p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <p>{item.district_name}</p>
                                                                    <p></p>
                                                                </td>
                                                                <td className="status">
                                                                    <p>{item.address}</p>
                                                                    <p></p>
                                                                </td>
                                                                <td>
                                                                    <form className="form" action="#" method="POST">
                                                                        <select className="action-box">
                                                                            <option>Đang hoạt động</option>
                                                                            <option>Dừng hoạt động</option>
                                                                        </select>
                                                                    </form>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }                                                      
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="chart-data">
                                    <div className="row">
                                        <div className="col-12 col-md-6 mb-2" style={{maxHeight: '600px'}}>
                                            <div className="chart___report radar-chart dark">
                                                <div className="actions">
                                                    <button type="button" className="btn btn-link" 
                                                            data-toggle="dropdown" 
                                                            aria-haspopup="true" aria-expanded="false">
                                                        <i className="zmdi zmdi-more-vert"></i>
                                                    </button>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <button className="dropdown-item" type="button">Action</button>
                                                        <button className="dropdown-item" type="button">Another action</button>
                                                        <button className="dropdown-item" type="button">Something else here</button>
                                                    </div>
                                                </div>
                                                <h3 className="title">Hợp đồng</h3>
                                                <p className="tagline"></p>
                                                <Bar options={thong_ke_hop_dong_options} data={thong_ke_hop_dong_data}/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 mb-2" style={{maxHeight: '600px'}}>
                                            <div className="chart___report bar-chart light">
                                                <div className="actions">
                                                    <button type="button" className="btn btn-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i className="zmdi zmdi-more-vert"></i>
                                                    </button>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <button className="dropdown-item" type="button">Action</button>
                                                        <button className="dropdown-item" type="button">Another action</button>
                                                        <button className="dropdown-item" type="button">Something else here</button>
                                                    </div>
                                                </div>
                                                <h3 className="title">Ngăn chặn, Giải toả</h3>
                                                <p className="tagline"></p>
                                                <Bar options={thong_ke_ngan_chan_giai_toa_options} data={thong_ke_ngan_chan_giai_toa_data}/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 mb-2">
                                            <div className="chart___report doughnut-chart dark">
                                                <div className="actions">
                                                    <button type="button" className="btn btn-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i className="zmdi zmdi-more-vert"></i>
                                                    </button>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <button className="dropdown-item" type="button">Action</button>
                                                        <button className="dropdown-item" type="button">Another action</button>
                                                        <button className="dropdown-item" type="button">Something else here</button>
                                                    </div>
                                                </div>
                                                <h3 className="title">Loại Hợp đồng</h3>
                                                <p className="tagline"></p>
                                                <Pie data={data} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default DailyReportComponent;
