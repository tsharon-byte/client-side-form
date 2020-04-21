import React from 'react';
import './PersonForm.css';
import Person from "./Person";

function InputComponent(props) {
    return (<div className="form-group">
        <label
            id={props.id + "-label"}
            htmlFor={props.id}>
            {props.id}
        </label>
        <input id={props.id}
               type={props.type}
               placeholder={"Enter your " + props.id}
               className="form-control"
               required
               value={props.value}
               onChange={props.onChange}
               min={props.min}
               max={props.max}
        >
        </input>
    </div>);
}

async function rest(person) {
    // let url=`http://localhost:8080/employee`;
    let url=`https://salty-river-90503.herokuapp.com/employee`;
    let promise = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(person)
    }).catch((error) => {
        alert("Нет доступа к серверу");
    });
    if (promise !== undefined) {
        if (promise.ok) { // если HTTP-статус в диапазоне 200-299
            // получаем тело ответа (см. про этот метод ниже)
            alert("Удалено из БД");
        } else {
            switch (promise.status) {
                case 404:
                    alert(`Нет такого пользователя в БД: ${person.firstName} ${person.lastName}`)
                    break;
                default:
                    alert("Ошибка HTTP: " + promise.status);
            }
        }
    }
}

class DeletePersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            firstName: "",
            lastName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.id) {
            case "Person First Name":
                this.setState({firstName: event.target.value});
                break;
            case "Person Last Name":
                this.setState({lastName: event.target.value});
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let p = new Person();
        p.firstName = this.state.firstName;
        p.lastName = this.state.lastName;
        rest(p);
    }

    render() {
        return (
            <div>
                <h1 id="title">
                    Delete person
                </h1>
                <form onSubmit={this.handleSubmit} id="survey-form">
                    {/*<InputComponent value={this.state.id}*/}
                    {/*                onChange={this.handleChange}*/}
                    {/*                id="Person Id"*/}
                    {/*                type="text"/>*/}
                    <InputComponent value={this.state.firstName}
                                    onChange={this.handleChange}
                                    id="Person First Name"
                                    type="text"/>
                    <InputComponent value={this.state.lastName}
                                    onChange={this.handleChange}
                                    id="Person Last Name"
                                    type="text"/>
                    <div className="form-group">
                        <button id="submit"
                                type="submit"
                                className="submit-button">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default DeletePersonForm;
