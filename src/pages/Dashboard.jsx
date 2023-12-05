import React,{useEffect,useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import {
  earningData,
  medicalproBranding,
  recentTransactions,
  weeklyStats,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData, 
} from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import product9 from "../data/product9.jpg";
import axios from "axios";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    /> 
  </div>
);

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();
  const [totalMembers, setTotalMembers] = useState();
  const [depositRequests, setDepositRequests] = useState();
  const [withdrawRequests, setWithdrawRequests] = useState();
  const [pendingLoans, setPendingLoans] = useState();
  const [transactions, setTransactions] = useState([]);

  // Fetch data for total members, deposit requests, withdraw requests, and pending loans
  const fetchData = async () => {
    try {
      const membersResponse = await axios.get('http://localhost:3001/countMembers');
      setTotalMembers(membersResponse.data.count);

      const depositResponse = await axios.get('http://localhost:3001/depositRequestsPending');
      setDepositRequests(depositResponse.data.count);

      const withdrawResponse = await axios.get('http://localhost:3001/withdrawRequestsPending');
      setWithdrawRequests(withdrawResponse.data.count);

      const loansResponse = await axios.get('http://localhost:3001/pendingLoans');
      setPendingLoans(loansResponse.data.data.length);

      const transactionsResponse = await axios.get('http://localhost:3001/transactions');
      setTransactions(transactionsResponse.data.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchData();
  }, []);

  return (
    <div className="mt-18">
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Total Members</p>
              <p className="text-2xl">{totalMembers}</p>
            </div>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="View"
              borderRadius="10px"
              />
          </div>
        </div>
            {/* 1st card end */}
            
              <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Deposit Request</p>
              <p className="text-2xl">{depositRequests}</p>
            </div>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="View"
              borderRadius="10px"
              />
          </div>
        </div>
        {/* 2nd card end */}

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Withdraw Request</p>
              <p className="text-2xl">{withdrawRequests}</p>
            </div>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="View"
              borderRadius="10px"
              />
          </div>
        </div>
{/* 3rd card end */}


<div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Pending Loans</p>
              <p className="text-2xl">{pendingLoans}</p>
            </div>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="View"
              borderRadius="10px"
              />
          </div>
        </div>
</div>
{/* 4th card end */}

      <div className="flex flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-760 w-90">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Expense Overview </p>
            
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
           

              <div className="w-40">
              <Pie
                id="pie-chart"
                data={ecomPieChartData}
                legendVisiblity={false}
                height="160px"
              />
              </div>

            </div>
            <div>
              <Stacked currentMode={currentMode} width="320px" height="360px" />
            </div>
          </div>
        </div>
      </div>

      

      <div>
        <table className='table text-center bg-info text-white'>
          <thead>
            <tr class="table-secondary">
              <th>Date</th>
              <th>Member</th>
              <th>Account Number</th>
              <th>Amount</th>
              <th>Debit/Credit</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-success">
            {transactions.slice(0,10).map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.member}</td>
                <td>{transaction.accountNumber}</td>
                <td>{transaction.transactionAmount}</td>
                <td>{transaction.debitOrCredit}</td>
                <td>{transaction.type}</td>
                <td>{transaction.status}</td>
                <td>{/* Render action button or data */}</td>
              </tr>
            ))}
          </tbody>
        </table>

    </div>
  </div>
  );
};

export default Ecommerce;



