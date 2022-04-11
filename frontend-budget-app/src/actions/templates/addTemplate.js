const addTemplate = (template) => {
    return {
        type: 'ADD_TEMPLATE',
        template
    }
}

const fetchAndAddTemplate = (template) => {
    return (dispatch) => {
        console.log('template:', template)
        fetch(('https://easy-budgety.herokuapp.com/templates'),{
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                template: template
            })
        })
        .then(response => response.json())
        .then(
            myjson => {
                if(myjson.error){
                    console.log(myjson.error)
                }else {
                    console.log("mytemplatejson:", myjson)
                    //message: "Can not find user"
                    //this.props.setNewBudgetID(myjson.data.id);
                    let tem = myjson.data.attributes;
                    tem.id = myjson.data.id;
                    let expenses = myjson.included.filter( (i) => i.type === 'expense');
                    let incomes = myjson.included.filter( (i) => i.type === 'income');
                    tem.incomes = incomes;
                    tem.expenses = expenses;

                    dispatch(addTemplate(tem))                    
                }
            }
        )
        .catch(console.log)
    }
}

export default fetchAndAddTemplate;