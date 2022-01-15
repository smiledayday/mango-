
import { useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined, AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined } from '@ant-design/icons'

const Header = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed);
    };

    return <Header style={{ padding: 0, background: "#fff" }}>

        <div>
            <div onClick={toggle} style={{ marginLeft: '1rem' }}>{collapsed ? <MenuUnfoldOutlined></MenuUnfoldOutlined> : <MenuFoldOutlined></MenuFoldOutlined>}</div>

            <div><AlignCenterOutlined /></div>
            <div><AlignLeftOutlined /></div>
            <div><AlignRightOutlined /></div>
        </div>
    </Header>
}

export default Header