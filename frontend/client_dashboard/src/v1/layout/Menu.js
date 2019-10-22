import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { routes, routesIcons } from '../routes/routes';

const isMobile = () => window.innerWidth <= 768;

const Menu = ({ page }) => {
    const [ toggled, setToggled ] = useState(false);
    const { overview, friends, manage_beneficiaries, transfer_assets, settings } = routes;
    return (
        <div className="menu">
            <div className="card">
                <div className="card-header panel-heading-2" 
                    onClick={() => { isMobile ? setToggled(!toggled) : null }}
                    style={{ width: "calc(100% + 2px)", marginLeft: "-1px", paddingTop: "10px", paddingBottom: "10px" }}>
                    <h5 className="panel-title">
                        <div className="triangle-topleft"></div>
                        Welcome
                    </h5>
                </div>
                <div className={`card-body${(toggled||!isMobile())?"": " gone"}`}
                    onClick={() => { isMobile ? setToggled(!toggled) : null }} 
                    style={{ paddingBottom: "40px"}}>
                    <ul className="menu-nav">
                        <Link to={overview}>
                            <li className={`each-menu${page === overview ? " active" : ""}`}>
                                <i className="material-icons">{routesIcons.overview}</i>
                                <span>Overview</span>
                            </li>
                        </Link>
                        <Link to={friends}>
                            <li className={`each-menu${page === friends ? " active" : ""}`}>
                                <i className="material-icons">{routesIcons.friends}</i>
                                <span>Friends</span>
                            </li>
                        </Link>
                        <Link to={transfer_assets}>
                            <li className={`each-menu${page === transfer_assets ? " active" : ""}`}>
                                <i className="material-icons">{routesIcons.transfer_assets}</i>
                                <span>Transfer Assets</span>
                            </li>
                        </Link>
                        <Link to={manage_beneficiaries}>
                            <li className={`each-menu${page === manage_beneficiaries ? " active" : ""}`}>
                                <i className="material-icons">{routesIcons.manage_beneficiaries}</i>
                                <span>Manage Beneficiaries</span>
                            </li>
                        </Link>
                        <Link to={settings}>
                            <li className={`each-menu${page === settings ? " active" : ""}`}>
                                <i className="material-icons">{routesIcons.settings}</i>
                                <span>Settings</span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default connect(({client})=>({...client}), null)(Menu);