import React, { useState } from 'react';
import styles from '../styles/transactionForm.module.css';
import { useDispatch } from 'react-redux';
import { nuevaTransaccion } from '../slices/TransactionSlice';
import { Button, DatePicker, Form, Input, Select, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useForm } from 'antd/es/form/Form';

export const TransactionForm = ({ textButton }) => {
  const [form] = useForm();
  const dateFormat = 'DD-MM-YYYY';

  const dispatch = useDispatch();

  const submitForm = (values) => {
    const formattedDate = values.date.format(dateFormat);

    const transaction = {
      id: Math.floor(Math.random() * 10000),
      fecha: formattedDate,
      categoria: values.category,
      monto: values.amount,
      descripcion: values.description,
      tipo: values.type,
    };
    dispatch(nuevaTransaccion(transaction));
    message.success('transacción agregada con éxito');
    form.resetFields();
  };

  const optionsCategory = [
    { value: 'Alimentos' },
    { value: 'Transporte' },
    { value: 'Limpieza' },
    { value: 'Servicios' },
  ];

  const optionsType = [{ value: 'Ingreso' }, { value: 'Egreso' }];

  return (
    <div className={styles.formTransacction}>
      <Form layout='vertical' onFinish={submitForm} form={form}>
        <Form.Item
          label='Fecha'
          name='date'
          rules={[{ required: true, message: 'Debe seleccionar una fecha' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            placeholder='Seleccione una fecha'
            format={dateFormat}
          />
        </Form.Item>
        <Form.Item
          label='Categoría'
          name='category'
          initialValue={''}
          rules={[
            { required: true, message: 'Debe seleccionar una categoría' },
          ]}
        >
          <Select options={optionsCategory} />
        </Form.Item>
        <Form.Item
          label='Monto'
          name='amount'
          rules={[{ required: true, message: 'Debe seleccionar un monto' }]}
        >
          <Input type='number' />
        </Form.Item>
        <Form.Item
          label='Descripción'
          name='description'
          rules={[{ required: true, message: 'Debe crear una descripción' }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label='Tipo de pago'
          name='type'
          initialValue={''}
          rules={[
            { required: true, message: 'Debe seleccionar un tipo de pago' },
          ]}
        >
          <Select options={optionsType} />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' type='primary'>
            {textButton}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
