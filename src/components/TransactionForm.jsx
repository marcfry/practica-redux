import React, { useState } from 'react';
import styles from '../styles/transactionForm.module.css';
import { useDispatch } from 'react-redux';
import {
  editarTransaccion,
  nuevaTransaccion,
} from '../slices/TransactionSlice';
import { Button, DatePicker, Form, Input, Select, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useForm } from 'antd/es/form/Form';
import moment from 'moment';
import { optionsCategory, optionsType } from '../data/dataSelects';

export const TransactionForm = ({ textButton, dataToEdit, setFormSwitch }) => {
  const [form] = useForm();
  const dateFormat = 'DD-MM-YYYY';
  const dispatch = useDispatch();
  const initialDate = dataToEdit?.fecha
    ? moment(dataToEdit?.fecha, dateFormat)
    : null;

  const submitForm = (values) => {
    const formattedDate = values.date.format(dateFormat);

    const transaction = {
      id: dataToEdit?.id || Math.floor(Math.random() * 10000),
      fecha: formattedDate,
      categoria: values.category,
      monto: values.amount,
      descripcion: values.description,
      tipo: values.type,
    };

    if (!dataToEdit) {
      dispatch(nuevaTransaccion(transaction));
      message.success('transacción agregada con éxito');
      form.resetFields();
    } else {
      dispatch(editarTransaccion(transaction));
      message.success('transaccion actualizada correctamente');
      setFormSwitch(false);
    }
  };

  return (
    <div className={styles.formTransacction}>
      <Form layout='vertical' onFinish={submitForm} form={form}>
        <Form.Item
          label='Fecha'
          name='date'
          initialValue={initialDate}
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
          initialValue={dataToEdit?.categoria || ''}
          rules={[
            { required: true, message: 'Debe seleccionar una categoría' },
          ]}
        >
          <Select options={optionsCategory} />
        </Form.Item>
        <Form.Item
          label='Monto'
          name='amount'
          initialValue={dataToEdit?.monto || ''}
          rules={[{ required: true, message: 'Debe seleccionar un monto' }]}
        >
          <Input type='number' />
        </Form.Item>
        <Form.Item
          label='Descripción'
          name='description'
          initialValue={dataToEdit?.descripcion || ''}
          rules={[{ required: true, message: 'Debe crear una descripción' }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label='Tipo de pago'
          name='type'
          initialValue={dataToEdit?.tipo || ''}
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
