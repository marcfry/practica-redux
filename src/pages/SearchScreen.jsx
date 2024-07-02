import { Input } from 'antd';
import React, { useState } from 'react';
import styles from '../styles/searchTransaction.module.css';
import { useSelector } from 'react-redux';
import { searcTransaction } from '../helpers/searchTransaction';
import { EditScreen } from './EditScreen';

export const SearchScreen = () => {
  const { Search } = Input;
  const [resultSearch, setResultSearch] = useState([]);
  const transactions = useSelector((state) => state.transactions);
  const [isSearch, setIsSearch] = useState(false);

  const onSearch = (value) => {
    if(!value){
      return setResultSearch([]);
    }
    const findTransactions = searcTransaction(transactions, value);
    setIsSearch(true);
    setResultSearch(findTransactions);
  };

  return (
    <div style={{ textAlign: 'center', width: '80%', marginTop: '32px' }}>
      <h2>Buscar transacción</h2>
      <div className={styles.searchTransaction}>
        <Search
          placeholder='Escriba para buscar la transacción'
          allowClear
          enterButton='Buscar'
          size='large'
          onSearch={onSearch}
        />
      </div>
      <div>
        {resultSearch.length ? (
          <EditScreen resultSearch={resultSearch} />
        ) : isSearch ? (
          <h4>No hay resultados para la búsqueda</h4>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
