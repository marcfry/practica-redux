import { createSlice } from '@reduxjs/toolkit';

const transactionsStorage = localStorage.getItem('transactions');
const initialState = transactionsStorage ? JSON.parse(transactionsStorage) : [];

const agregarDataStorage = (array) => {
  localStorage.setItem('transactions', JSON.stringify(array));
};

const searchTransactions = (transactions, searchString) => {
  return transactions.filter((transaction) =>
    Object.values(transaction).some((value) =>
      String(value).toLowerCase().includes(searchString.toLowerCase())
    )
  );
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    nuevaTransaccion: (state, action) => {
      state.push(action.payload);
      agregarDataStorage(state);
    },
    editarTransaccion: (state, action) => {
      const { id, ...transactionToUpdate } = action.payload;
      const findTransaction = state.find(
        (transaction) => transaction.id === id
      );
      if (findTransaction) {
        Object.assign(findTransaction, transactionToUpdate);
        agregarDataStorage(state);
      }
    },
    eliminarTransaccion: (state, action) => {
      const filterTransactions = state.filter(
        (transaction) => transaction.id !== action.payload
      );
      agregarDataStorage(filterTransactions);
      return filterTransactions;
    },
    buscarTransaccion: (state, action) => {
      state.searchResults = initialState.filter((transaction) =>
      Object.values(transaction).some((value) =>
        String(value).toLowerCase().includes(action.payload.toLowerCase())
      )
    );
  },
        
      // const searchResult = state.filter((transaction) =>
      //   Object.values(transaction).some((value) =>
      //     String(value).toLowerCase().includes(action.payload.toLowerCase())
      //   )
      // );
      // console.log(searchResult)
      // return searchResult;

  },
});

export const {
  nuevaTransaccion,
  editarTransaccion,
  eliminarTransaccion,
  buscarTransaccion,
} = transactionSlice.actions;
export default transactionSlice.reducer;
