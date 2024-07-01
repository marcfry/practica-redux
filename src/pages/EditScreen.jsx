import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransactionForm } from '../components/TransactionForm';
import { List, Row, Col, Typography, Button, Popconfirm } from 'antd';
import { eliminarTransaccion } from '../slices/TransactionSlice';

export const EditScreen = () => {
  const [dataToEdit, setDataToEdit] = useState(null);
  const transacciones = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const [formSwitch, setFormSwitch] = useState(false);
  const { Title } = Typography;

  const editTransaction = (item) => {
    setDataToEdit(item);
    setFormSwitch(true);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {formSwitch ? (
        <h2>Editar Transacción </h2>
      ) : (
        <h2>Lista de Transacciones</h2>
      )}

      {formSwitch ? (
        <TransactionForm
          textButton='Actualizar Transacción'
          dataToEdit={dataToEdit}
          setFormSwitch={setFormSwitch}
        />
      ) : (
        <>
          <Row gutter={16}>
            <Col span={4}>
              <Title level={5}>Fecha</Title>
            </Col>
            <Col span={4}>
              <Title level={5}>Categoría</Title>
            </Col>
            <Col span={4}>
              <Title level={5}>Monto</Title>
            </Col>
            <Col span={4}>
              <Title level={5}>Descripción</Title>
            </Col>
            <Col span={3}>
              <Title level={5}>Tipo</Title>
            </Col>
            <Col span={4}>
              <Title level={5}>Acciones</Title>
            </Col>
          </Row>
          <List
            dataSource={transacciones}
            renderItem={(item) => (
              <List.Item>
                <Row gutter={16} style={{ width: '100%' }}>
                  <Col span={4}>{item.fecha}</Col>
                  <Col span={4}>{item.categoria}</Col>
                  <Col span={4}>{item.monto}</Col>
                  <Col span={4}>{item.descripcion}</Col>
                  <Col span={3}>{item.tipo}</Col>
                  <Col span={4}>
                    <Button
                      type='primary'
                      onClick={() => editTransaction(item)}
                    >
                      Editar
                    </Button>{' '}
                    <Popconfirm
                      title='Eliminar transacción'
                      description={`Está seguro que desea eliminar la transacción ${item.descripcion}`}
                      onConfirm={() => dispatch(eliminarTransaccion(item.id))}
                      okText='Si'
                      cancelText='No'
                    >
                      <Button type='primary' danger>
                        Eliminar
                      </Button>
                    </Popconfirm>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </>
      )}
    </div>
  );
};
