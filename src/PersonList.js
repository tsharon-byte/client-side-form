import React from 'react';
import './PersonForm.css';

class PersonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfPersons: []
        };
        this.rest = this.rest.bind(this);
    }

    async rest() {
        // let url=`http://localhost:8080/employeeList`;
        let url=`https://salty-river-90503.herokuapp.com/employeeList`;
        let promise = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).catch((error) => {
            alert("Нет доступа к серверу");
        });
        if (promise !== undefined) {
            if (promise.ok) { // если HTTP-статус в диапазоне 200-299
                // получаем тело ответа (см. про этот метод ниже)
                let json = await promise.json();
                this.setState({
                    listOfPersons: json
                });
            } else {
                alert("Ошибка HTTP: " + promise.status);
            }
        }
    }

    componentDidMount() {
        console.log('Component did mount!');
        this.rest();
    }

    render() {
        return (
            <div>
                <h2>List of all persons</h2>
                <div style={{marginLeft: "20px"}}>
                    <table border="2" cellSpacing="5" style={{backgroundColor: 'rgba(150,150,150,0.4)'}}>
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last name</th>
                            <th>E-mail</th>
                            <th>Age</th>
                            <th>Current role</th>
                            <th>Recommend</th>
                            <th>Language</th>
                            <th>Comments</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.listOfPersons.map((person,id) =>
                            (<tr key={id}>
                                <td>{person.firstName}</td>
                                <td>{person.lastName}</td>
                                <td>{person.email}</td>
                                <td>{person.age}</td>
                                <td>{person.currentUserRole}</td>
                                <td>{person.recommend}</td>
                                <td>{person.language}</td>
                                <td>{person.comments}</td>
                            </tr>)
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default PersonList;
