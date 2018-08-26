import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
    return (
        <Menu style={{ marginTop: '10px' }}>
            {/*<Menu.Item>KickStart</Menu.Item>*/}
            <Link route="/"><a className="item">KickStart</a></Link>
            <Menu.Menu position="right">
                {/*<Menu.Item>Projects</Menu.Item>*/}
                {/*<Menu.Item>+</Menu.Item>*/}
                <Link route="/"><a className="item">Projects</a></Link>
                <Link route="/projects/new"><a className="item">+</a></Link>
            </Menu.Menu>
        </Menu>
    )
};