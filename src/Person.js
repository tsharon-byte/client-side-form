class Person {
    constructor(
        firstName,
        lastName,
        email,
        age,
        currentRole,
        recommend,
        language,
        comments,
        id=null) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.currentUserRole = currentRole;
        this.recommend = recommend;
        this.language = language;
        this.comments = comments;
    }
}

export default Person;