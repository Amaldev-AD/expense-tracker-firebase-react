import { addDoc,collection,serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { userGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
    const transactionCollectionRef = collection(db,"transactions")
    const { userId } =userGetUserInfo()
    const addTransaction = async(description,transactionAmount,transactionType) => {
        await addDoc(transactionCollectionRef,{
            userId:userId,
            description,
            transactionAmount,
            transactionType,
            createdAt:serverTimestamp()

        })
    };
    return {addTransaction};
}