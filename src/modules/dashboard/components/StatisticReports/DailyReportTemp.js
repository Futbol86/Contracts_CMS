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
    CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Filler, Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart'
        }
    }
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const data = {
    labels,
    datasets: [
        // {
        //     label: 'Dataset 1',
        //     data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
        // },
        {
            label: 'Dataset 2',
            data: [100, 200, 300, 400], //labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
    ]
}

const DailyReportComponent = ({ newReports }) => {
    console.log("----- DailyReportComponent", newReports)
    const { allTime } = newReports || {};
    return (
        <div className="animated fadeIn">
            <Card>
                {/* <CardHeader>
                    <h2>
                        Daily Report
                    </h2>
                </CardHeader> */}
                <CardBody>
                    <Row>
                        <Col md="12">
                            {/* <Bar options={options} data={data}/> */}
                            <main role="main" className="col-md-12 ml-sm-auto col-lg-12 my-3">
                                <div className="card-list">
                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                                            <div className="card___report blue">
                                                <div><h4>HÔM NAY</h4></div>
                                                <div className="d-flex justify-content-between">
                                                    <div className='text-center'>
                                                        <div className="title">HỢP ĐỒNG</div>
                                                        <i className="zmdi zmdi-upload"></i>
                                                        <div className="value">89</div>
                                                        <div className="stat"><b>13</b>% increase</div>
                                                    </div>
                                                    <div className='text-center'>
                                                        <div className="title">NGĂN CHẶN/GIẢI TOẢ</div>
                                                        <i className="zmdi zmdi-upload"></i>
                                                        <div className="value">90</div>
                                                        <div className="stat"><b>13</b>% increase</div>
                                                    </div>   
                                                    <div className='text-center'>
                                                        <div className="title">THU HỒI/HUỶ</div>
                                                        <i className="zmdi zmdi-upload"></i>
                                                        <div className="value">90</div>
                                                        <div className="stat"><b>13</b>% increase</div>
                                                    </div>    
                                                    <div className='text-center'>
                                                        <div className="title">TRA CỨU</div>
                                                        <i className="zmdi zmdi-upload"></i>
                                                        <div className="value">90</div>
                                                        <div className="stat"><b>13</b>% increase</div>
                                                    </div>       
                                                </div>
                                             
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                                            <div className="card___report green">
                                                <div className="title">team members</div>
                                                <i className="zmdi zmdi-upload"></i>
                                                <div className="value">5,990</div>
                                                <div className="stat"><b>4</b>% increase</div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                                            <div className="card___report orange">
                                                <div className="title">total budget</div>
                                                <i className="zmdi zmdi-download"></i>
                                                <div className="value">$80,990</div>
                                                <div className="stat"><b>13</b>% decrease</div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                                            <div className="card___report red">
                                                <div className="title">new customers</div>
                                                <i className="zmdi zmdi-download"></i>
                                                <div className="value">3</div>
                                                <div className="stat"><b>13</b>% decrease</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="projects___report mb-4">
                                    <div className="projects-inner">
                                        <header className="projects-header___report">
                                            <div className="title">THỐNG KÊ ĐƠN VỊ</div>
                                            <div className="count">| 32 Projects</div>
                                            <i className="zmdi zmdi-download"></i>
                                        </header>
                                        <table className="projects-table___report">
                                            <thead>
                                                <tr>
                                                    <th>Đơn vị</th>
                                                    <th>Số lượng</th>
                                                    {/* <th>Leader + Team</th>
                                                    <th>Budget</th>
                                                    <th>Status</th>
                                                    <th className="text-right">Actions</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p>Huỳnh Thị Liêm</p>
                                                        <p>Google</p>
                                                    </td>
                                                    <td>
                                                        <p>15</p>
                                                        <p className="text-danger">Overdue</p>
                                                    </td>
                                                    <td className="member">
                                                        <figure><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png" /></figure>
                                                        <div className="member-info">
                                                            <p>Myrtle Erickson</p>
                                                            <p>UK Design Team</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p>$4,670</p>
                                                        <p>Paid</p>
                                                    </td>
                                                    <td className="status">
                                                        <span className="status-text status-orange">In progress</span>
                                                    </td>
                                                    <td>
                                                        <form className="form" action="#" method="POST">
                                                        <select className="action-box">
                                                            <option>Actions</option>
                                                            <option>Start project</option>
                                                            <option>Send for QA</option>
                                                            <option>Send invoice</option>
                                                        </select>
                                                        </form>
                                                    </td>
                                                </tr>
                                                <tr className="danger-item___report">
                                                    <td>
                                                        <p>New Dashboard</p>
                                                        <p>Google</p>
                                                    </td>
                                                    <td>
                                                        <p>17th Oct, 15</p>
                                                        <p className="text-danger">Overdue</p>
                                                    </td>
                                                    <td className="member">
                                                        <figure><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png" /></figure>
                                                        <div className="member-info">
                                                            <p>Myrtle Erickson</p>
                                                            <p>UK Design Team</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p>$4,670</p>
                                                        <p>Paid</p>
                                                    </td>
                                                    <td className="status">
                                                        <span className="status-text status-red">Blocked</span>
                                                    </td>
                                                    <td>
                                                        <form className="form" action="#" method="POST">
                                                            <select className="action-box">
                                                                <option>Actions</option>
                                                                <option>Start project</option>
                                                                <option>Send for QA</option>
                                                                <option>Send invoice</option>
                                                            </select>
                                                        </form>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>New Dashboard</p>
                                                        <p>Google</p>
                                                    </td>
                                                    <td>
                                                        <p>17th Oct, 15</p>
                                                        <p className="text-danger">Overdue</p>
                                                    </td>
                                                    <td className="member">
                                                        <figure><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png" /></figure>
                                                        <div className="member-info">
                                                            <p>Myrtle Erickson</p>
                                                            <p>UK Design Team</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p>$4,670</p>
                                                        <p>Paid</p>
                                                    </td>
                                                    <td className="status">
                                                        <span className="status-text status-orange">In progress</span>
                                                    </td>
                                                    <td>
                                                        <form className="form" action="#" method="POST">
                                                            <select className="action-box">
                                                                <option>Actions</option>
                                                                <option>Start project</option>
                                                                <option>Send for QA</option>
                                                                <option>Send invoice</option>
                                                            </select>
                                                        </form>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>New Dashboard</p>
                                                        <p>Google</p>
                                                    </td>
                                                    <td>
                                                        <p>17th Oct, 15</p>
                                                        <p className="text-danger">Overdue</p>
                                                    </td>
                                                    <td className="member">
                                                        <figure><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png" /></figure>
                                                        <div className="member-info">
                                                            <p>Myrtle Erickson</p>
                                                            <p>UK Design Team</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p>$4,670</p>
                                                        <p>Paid</p>
                                                    </td>
                                                    <td className="status">
                                                        <span className="status-text status-blue">Early stages</span>
                                                    </td>
                                                    <td>
                                                        <form className="form" action="#" method="POST">
                                                            <select className="action-box">
                                                                <option>Actions</option>
                                                                <option>Start project</option>
                                                                <option>Send for QA</option>
                                                                <option>Send invoice</option>
                                                            </select>
                                                        </form>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>New Dashboard</p>
                                                        <p>Google</p>
                                                    </td>
                                                    <td>
                                                        <p>17th Oct, 15</p>
                                                        <p className="text-danger">Overdue</p>
                                                    </td>
                                                    <td className="member">
                                                        <figure><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png" /></figure>
                                                        <div className="member-info">
                                                            <p>Myrtle Erickson</p>
                                                            <p>UK Design Team</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p>$4,670</p>
                                                        <p>Paid</p>
                                                    </td>
                                                    <td className="status">
                                                        <span className="status-text status-orange">In progress</span>
                                                    </td>
                                                    <td>
                                                        <form className="form" action="#" method="POST">
                                                            <select className="action-box">
                                                <option>Actions</option>
                                                <option>Start project</option>
                                                <option>Send for QA</option>
                                                <option>Send invoice</option>
                                                </select>
                                                        </form>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="chart-data">
                                    <div className="row">
                                        <div className="col-12 col-md-4">
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
                                                <h3 className="title">Household Expenditure</h3>
                                                <p className="tagline">Yearly</p>
                                                <canvas height="400" id="radarChartDark"></canvas>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
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
                                                <h3 className="title">Monthly revenue</h3>
                                                <p className="tagline">2015 (in thousands US$)</p>
                                                <canvas height="400" id="barChartHDark"></canvas>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
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
                                                <h3 className="title">Exports of Goods</h3>
                                                <p className="tagline">2015 (in billion US$)</p>
                                                <canvas height="400" id="doughnutChartDark"></canvas>
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
