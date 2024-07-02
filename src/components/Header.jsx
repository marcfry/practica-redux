import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  RightCircleOutlined,
  SearchOutlined,
  TransactionOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    label: 'Agregar Transacción',
    key: '/',
    icon: <TransactionOutlined />,
  },
  {
    label: 'Lista de Transacciones',
    key: 'list',
    icon: <UnorderedListOutlined />,
  },
  {
    label: 'Buscar',
    key: 'search',
    icon: <SearchOutlined />,
  },
  {
    label: 'Resumen',
    key: 'resume',
    icon: <RightCircleOutlined />,
  },
];
export const Header = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState();
  const onClick = (e) => {
    navigate(e.key);
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={['/']}
      selectedKeys={[current]}
      theme='dark'
      mode='horizontal'
      items={items}
      style={{display: 'flex', justifyContent: 'center', width: '100vw'}}
    />
  );
};
