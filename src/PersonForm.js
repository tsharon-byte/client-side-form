import React from 'react';
import Person from './Person';
import './PersonForm.css';

const languageData = [
    {title: 'Java', active: true},
    {title: 'Java script', active: false},
    {title: 'C++', active: false},
];

const roles = ['Full time job', 'Student'];

const recommendData = [
    {title: 'Yes'},
    {title: 'No'},
    {title: 'Maybe'},
];

function Checkbox(props) {
    return (<div>
        <label>{props.label}</label>
        <input type="checkbox" name="language" checked={props.selected} onChange={props.onChange} value={props.label}/>
    </div>);
}

function Radio(props) {
    let result = (
        <div>
            <label>{props.label}</label>
            <input type="radio" name="language" checked={props.selected} onChange={props.onChange} value={props.label}/>
        </div>
    );
    return result;
}


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
    // let url = `http://localhost:8080/employee`;
    let url ="https://server-side-form.herokuapp.com/employee";
    try {
        let promise = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(person)
        });
        if (promise.ok) { // если HTTP-статус в диапазоне 200-299
            // получаем тело ответа (см. про этот метод ниже)
            alert("Сохранено в БД");
        } else {
            alert("Ошибка HTTP: " + promise.status);
        }
    } catch (error) {
        alert("Нет доступа к серверу");
    }
}

class PersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            age: "",
            currentRole: roles[0],
            recommendOption: recommendData[0].title,
            language: languageData.slice(),
            comments: "",
        }

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRecommendChange = this.handleRecommendChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleCommentsChange = this.handleCommentsChange.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }

    handleFirstNameChange(event) {
        this.setState({firstName: event.target.value});
    }

    handleLastNameChange(event) {
        this.setState({lastName: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleAgeChange(event) {
        this.setState({age: event.target.value});
    }

    handleRecommendChange(event) {
        this.setState({recommendOption: event.target.value});
    }

    handleRoleChange(event) {
        this.setState({currentRole: event.target.value});
    }

    handleCommentsChange(event) {
        this.setState({comments: event.target.value});
    }

    handleLanguageChange(event) {
        //проверяем checked и value
        let languageUpdate = this.state.language.slice();
        languageUpdate.forEach(item => {
            if (item.title === event.target.value) {
                item.active = !item.active;
            }
        })
        this.setState({language: languageUpdate});
    }

    handleSubmit(event) {
        event.preventDefault();
        //TODO здесь должна быть отправка рест запроса на сервер
        let language = this.state.language.reduce(
            (accumulator, currentValue) => {
                return currentValue.active ? accumulator + (accumulator.length > 0 ? ',' : '') + currentValue.title : accumulator
            },
            ""
        );
        let person = new Person(this.state.firstName,
            this.state.lastName,
            this.state.email,
            this.state.age,
            this.state.currentRole,
            this.state.recommendOption,
            language,
            this.state.comments);
        // alert(JSON.stringify(person, null, 4));
        rest(person);
        // let history = useHistory();
        // history.push("/personList");
        // window.location.assign('http://localhost:3000/personList/');
        // this.props.history.push('/personList');
    }

    render() {
        return (
            <div>
                <h1 id="title">
                    Register
                </h1>
                <p id="description">
                    <em>Fill in the registration form below</em>
                </p>
                <form onSubmit={this.handleSubmit} id="survey-form">
                    <InputComponent value={this.state.firstName}
                                    onChange={this.handleFirstNameChange}
                                    id="First Name"
                                    type="text"/>
                    <InputComponent value={this.state.lastName}
                                    onChange={this.handleLastNameChange}
                                    id="Last Name"
                                    type="text"/>
                    <InputComponent value={this.state.email}
                                    onChange={this.handleEmailChange}
                                    id="E-mail"
                                    type="email"/>
                    <InputComponent value={this.state.age}
                                    onChange={this.handleAgeChange}
                                    id="Age(optional)"
                                    min="10"
                                    max="99"
                                    type="number"/>
                    <div className="form-group">
                        <label id="select-label"
                               htmlFor="dropdown">Which option best describes your current role?</label>
                        <select value={this.state.currentRole} onChange={this.handleRoleChange}>
                            {roles.map((item, ix) => <option key={ix} value={item}>{item}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>
                            Would you recommend our site to your friend?
                        </label>
                        {recommendData.map((item, ix) => <Radio key={ix}
                                                                selected={item.title === this.state.recommendOption}
                                                                label={item.title}
                                                                onChange={this.handleRecommendChange}/>)}
                    </div>
                    <div className="form-group">
                        <label>
                            What language do you like to learn?
                        </label>
                        {this.state.language.map((item, ix) => <Checkbox key={ix} selected={item.active}
                                                                         label={item.title}
                                                                         onChange={this.handleLanguageChange}/>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">
                            Any comments or suggestions?
                        </label>
                        <textarea id="comments"
                                  name="comments"
                                  className="form-control"
                                  value={this.state.comments}
                                  onChange={this.handleCommentsChange}>
		                </textarea>
                    </div>
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

export default PersonForm;
