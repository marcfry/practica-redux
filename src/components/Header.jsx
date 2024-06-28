import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    label: 'Agregar Transacción',
    key: 'addTransaction',
    icon: <MailOutlined />,
  },
  {
    label: 'Lista de Transacciones',
    key: 'transactionList',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Buscar',
    key: 'search',
    icon: <SettingOutlined />,
  },
  {
    label: 'Resumen',
    key: 'resume',
    icon: <SettingOutlined />,
  },
];
export const Header = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      theme='dark'
      mode='horizontal'
      items={items}
      style={{display: 'flex', justifyContent: 'center', width: '100vw'}}
    />
  );
};
