import React from 'react';
import LogOut from './LogOut.js';
import { connect } from 'react-redux';
import DropDown from './components/DropDown.js';

class NavigationBar extends React.Component {
    //links to budgets list, templates list budget form, template form, log out, only displayed when logged in
    

    render(){
        const { templates, budgets } = this.props
        console.log(templates[0])
        return(
            <div className="nav-container">
                <div className="nav-bar">                
                    <div className="nav-item"><LogOut/></div>
                    <br></br>
                    <div className="nav-item"> New Budget Template </div>
                    <br></br>
                    <div className="nav-item">  New Budget  </div>
                    <br></br>
                    
                        
                        {/* <ul className="list">
                            {this.props.templates.map((t) => {
                                return <DropDown key={t.id} item={t.attributes}/>    
                            })}               
                        </ul> */}
                    
                    <div className="nav-item"><DropDown title="Select Template" items={templates}/></div>
                    <br></br>
                    <div className="nav-item"><DropDown title="Select Budget" items={budgets}/></div> 
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ templates, budgets}) => {
    return {
        templates,
        budgets
    }
}

export default connect(mapStateToProps)(NavigationBar)