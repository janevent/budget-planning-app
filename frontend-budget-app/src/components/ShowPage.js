import React from 'react';
//import edit button/ or link




//why this in render works even though it is not binding this or an arrow function

const ShowPage = ( { data }) => {
    
        return (
            <div className="ShowPage">
                { data ?
                    <div className="show-page-wrap">
                        <h2>{data.title}</h2>
                        <h3>Expenses</h3>
                        <div>{
                            data.expenses ?
                            data.expenses.map (t => <div className="expenses-wrapper"><p>{t.attributes.description} : ${t.attributes.amount}</p></div> ) :
                            ""
                        }
                        </div>
                        <h3>Total Expenditure: ${data.total_expenditure} </h3>
                        <h3>Incomes</h3>
                        <div>{
                            data.incomes ?
                            data.incomes.map ( i => <div className='incomes-wrapper'><p>{i.attributes.description} : ${i.attributes.amount}</p></div>) :
                            ""
                        }
                        </div>
                        <h3>Total Income: ${data.total_income}</h3>
                        <h3>Total Difference: ${data.total_difference}</h3>
                    </div>
                :
                "" }
            </div>
        )
}

export default ShowPage

