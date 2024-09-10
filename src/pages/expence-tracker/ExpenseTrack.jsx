import React, { useEffect, useState } from 'react'
import { useAddTransaction } from '../../hooks/useAddTransactions'
import { useGetTransaction } from '../../hooks/useGetTransaction'
import { userGetUserInfo } from '../../hooks/useGetUserInfo'
import logo from '../../assets/logoipsum-288.svg'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase-config'



const ExpenseTrack = () => {
  const {addTransaction} = useAddTransaction()
  const { transactions,transactionTotals } = useGetTransaction()
  const { name,profilePhoto } = userGetUserInfo()
  const navigate = useNavigate()

  const [description, setDiscription] =useState("")
  const [transactionAmount, setTransactionAmount] =useState("")
  const [transactionType, setTransactionType] =useState("expense")

  // updating balance
  const { balance,income,expenses } =transactionTotals




  

  const onSubmit = (e) => {
    e.preventDefault();

    
    addTransaction(description,transactionAmount,transactionType)
    setDiscription("")
    setTransactionAmount("")
  

  }

  const onSignOut = async() => {
    try{

      await signOut(auth)
      localStorage.clear()
      navigate('/')
    }catch(err){
      console.error(err)
    }
  }
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <nav className="bg-white shadow-md py-4 px-10 flex justify-between items-center">
          <img src={logo} alt="Logo" className="w-32" />
          <div className="flex items-center gap-4">
            {profilePhoto ? (
              <img className="rounded-full w-10 h-10" src={profilePhoto} alt="Profile" />
            ) : (
              <p>No profile photo</p>
            )}
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-lg"
              onClick={onSignOut}
            >
              Sign Out
            </button>
          </div>
        </nav>

        <div className="container mx-auto mt-10">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800">{name}'s Expense Tracker</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white shadow-lg p-6 rounded-lg text-center">
              <h3 className="text-lg font-medium text-gray-600">Your Balance</h3>
              <h2 className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {balance >= 0 ? `$${balance}` : `-$${-balance}`}
              </h2>
            </div>
            <div className="bg-green-100 p-6 rounded-lg text-center">
              <h3 className="text-lg font-medium text-gray-600">Income</h3>
              <p className="text-3xl text-green-500">${income}</p>
            </div>
            <div className="bg-red-100 p-6 rounded-lg text-center">
              <h3 className="text-lg font-medium text-gray-600">Expenses</h3>
              <p className="text-3xl text-red-500">${expenses}</p>
            </div>
          </div>

          <div className="bg-white shadow-lg p-8 rounded-lg mb-10">
            <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <input
                className="border border-gray-300 rounded-lg py-2 px-4 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded-lg py-2 px-4 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                placeholder="Amount"
                required
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
              />
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    className="form-radio text-red-500"
                    type="radio"
                    id="expense"
                    value="expense"
                    checked={transactionType === 'expense'}
                    onChange={(e) => setTransactionType(e.target.value)}
                  />
                  <label htmlFor="expense" className="ml-2">
                    Expense
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    className="form-radio text-green-500"
                    type="radio"
                    id="income"
                    value="income"
                    checked={transactionType === 'income'}
                    onChange={(e) => setTransactionType(e.target.value)}
                  />
                  <label htmlFor="income" className="ml-2">
                    Income
                  </label>
                </div>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg"
                type="submit"
              >
                Add Transaction
              </button>
            </form>
          </div>

          <div className="bg-white shadow-lg p-8 rounded-lg">
            <h3 className="text-3xl font-bold mb-6">Transactions</h3>
            <ul className="space-y-6">
              {transactions.map((transaction, index) => {
                const { description, transactionAmount, transactionType } = transaction;
                return (
                  <li key={index} className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-700">{description}</h4>
                      <p className={`text-lg font-medium ${transactionType === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                        ${transactionAmount} - {transactionType}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExpenseTrack
