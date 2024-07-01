import { Input } from 'antd'
import React, { useState } from 'react'
import styles from '../styles/searchTransaction.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { buscarTransaccion } from '../slices/TransactionSlice';

export const SearchScreen = () => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const [resultSearch, setResultSearch] = useState(null);
  // const transacciones = useSelector((state) => state.transactions.searchResult);

  // console.log(transacciones)


  const onSearch = (value, _e, info) => {
    const findTransactions = dispatch(buscarTransaccion(value));
    setResultSearch(findTransactions)
  }
  console.log(resultSearch)
  return (
    <div style={{textAlign: 'center', width: '80%', marginTop: '32px'}}>
      <h2>Buscar transacción</h2>
      <div className={styles.searchTransaction}>
      <Search
      placeholder="Escriba para buscar la transacción"
      allowClear
      enterButton="Buscar"
      size="large"
      onSearch={onSearch}
    />
      </div>
    </div>
  )
}
