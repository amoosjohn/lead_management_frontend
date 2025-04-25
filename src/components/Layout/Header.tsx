import React from 'react';
import connectLogo from '../Assets/Images/logo.png';
import {Col} from "antd";

function Header() {

    return (
        <>
            <Col span={24}>
                <Col span={2}>
                    <img src={connectLogo} className={'logo'} alt="logo"/>
                </Col>
            </Col>
        </>
    );
}

export default Header;