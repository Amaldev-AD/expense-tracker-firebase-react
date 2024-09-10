import { onSnapshot, orderBy, query, where,collection } from "firebase/firestore"
import { useEffect, useState } from "react"
import { userGetUserInfo } from "./useGetUserInfo"
import { db } from "../config/firebase-config"
export const useGetTransaction =() => {
    const [transactions,setTransactions] = useState([])
    const [transactionTotals,setTransactionsTotal] = useState({
        balance:0.0,
        income:0.0,
        expenses:0.0
    })

    const transactionCollectionRef = collection(db,"transactions")

    const { userId } = userGetUserInfo()

    const getTransaction = async() => {
        let unsubscribe;
        try{

            const queryTransaction = query(transactionCollectionRef,where("userId","==",userId),
            orderBy("createdAt")
        );
         unsubscribe = onSnapshot(queryTransaction, (snapshot) => {
            let docs = []
            let totalIncome= 0;
            let totalExpense=0;
            snapshot.forEach((doc) => {
                const data = doc.data();
                const id = doc.id

                docs.push({...data,id})

                if(data.transactionType === "expense"){
                    totalExpense+= Number(data.transactionAmount)
                }else{
                    totalIncome+= Number(data.transactionAmount)
                }
            })
            setTransactions(docs);
            let balance = totalIncome-totalExpense
            setTransactionsTotal({
                balance,
                expenses:totalExpense,
                income:totalIncome
            })
        })
            


        }catch(err){console.error(err)}

        return() => unsubscribe()
    }
    useEffect(() => {
        getTransaction()
    },[])

    return { transactions,transactionTotals }
}