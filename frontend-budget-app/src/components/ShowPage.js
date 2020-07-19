import React from 'react';
//import edit button/ or link later
import Delete from './Delete.js';

const ShowPage = ( { data, deleteData, hoverDelete }) => {
    
        return (
            <div className="ShowPage">
                { data ?
                    <div className="show-page-wrap">
                        <h2>{data.title}</h2>
                        <h3>Expenses</h3>
                        <div>{
                            data.expenses ?
                            data.expenses.map (t => <p className="expenses-wrapper">{t.attributes.description} : ${t.attributes.amount}</p> ) :                            ""
                        }
                        </div>
                        <h3>Total Expenditure: ${data.total_expenditure} </h3>
                        <h3>Incomes</h3>
                        <div>{
                            data.incomes ?
                            data.incomes.map ( i => <p className='incomes-wrapper'>{i.attributes.description} : ${i.attributes.amount}</p>) :
                            ""
                        }
                        </div>
                        <h3>Total Income: ${data.total_income}</h3>
                        <h3>Total Difference: ${data.total_difference}</h3>
                        <br></br>
                        <Delete item={data} deleteData={deleteData} hoverDelete={hoverDelete} />                       
                    </div>
                :
                "" }
            </div>
        )
}

export default ShowPage

