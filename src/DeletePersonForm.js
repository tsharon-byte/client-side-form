import React from 'react';
import './PersonForm.css';

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

async function rest(id) {
    let promise = await fetch("https://salty-river-90503.herokuapp.com/employee/"+id, {
        method: 'DELETE',
    }).catch((error) => {
        alert("Нет доступа к серверу");
    });
    if (promise !== undefined) {
        if (promise.ok) { // если HTTP-статус в диапазоне 200-299
            // получаем тело ответа (см. про этот метод ниже)
            alert("Удалено из БД");
        } else {
            alert("Ошибка HTTP: " + promise.status);
        }
    }
}

class DeletePersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({id: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        rest(this.state.id);
    }

    render() {
        return (
            <div>
                <h1 id="title">
                    Delete person by Id
                </h1>
                <form onSubmit={this.handleSubmit} id="survey-form">
                    <InputComponent value={this.state.id}
                                    onChange={this.handleChange}
                                    id="Person Id"
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
