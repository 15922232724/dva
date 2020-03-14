import React, { Component } from 'react';
import { Breadcrumb, Row, Col } from 'antd';
import { Link } from 'dva/router';
import Icon from '../Icon';
import cx from 'classnames';
import CSSAnimate from '../CSSAnimate';
import Mask from '../Mask';
import './style/index.less';

class TopBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentRoute: this.getRouteLevel(props.location.pathname) || []
    };
  }

  componentWillReceiveProps (nextProps) {
    const currentRoute = this.getRouteLevel(nextProps.location.pathname);
    this.setState({
      currentRoute
    });
  }

  getRouteLevel = pathName => {
    const orderPaths = [];
    pathName.split('/').reduce((prev, next) => {
      const path = [prev, next].join('/');
      orderPaths.push(path);
      return path;
    });

    return orderPaths
      .map(item => {
        for (let key in window.dva_router_pathMap) {
          if (key.search(":") !== -1) {
            if (item.search(key.split(':')[0]) !== -1) {
              return window.dva_router_pathMap[key]
            }
          }
        }
        return window.dva_router_pathMap[item];
      })
      .filter(item => !!item);
  };

  render () {
    const {
      expand,
      toggleRightSide,
      collapsedRightSide,
      onCollapse
    } = this.props;
    const { currentRoute } = this.state;
    console.log(currentRoute)
    const classnames = cx('topbar', {
      'topbar-expand': expand
    });

    return (
      <div className={classnames}>
        <div className="topbar-dropmenu">

        </div>
        <header className="topbar-content">
          {currentRoute.length ? (
            <Breadcrumb>
              {currentRoute.filter(item => item.path.indexOf(':') === -1).map((item, index) => (

                < Breadcrumb.Item key={index} >

                  {item.title}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          ) : null}

        </header>

      </div >
    );
  }
}

export default TopBar;
