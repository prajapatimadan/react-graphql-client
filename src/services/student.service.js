import httpCommon from "./http-common";
class StudentService {
    constructor(){
        this.gqlUrl = "/studentgql";
    }
    getAll(){
        return httpCommon.post(this.gqlUrl,{"query":"{students{id firstName lastName email password collegeId},colleges{id name location rating}}"});
    }
    getById(id){
        return httpCommon.post(this.gqlUrl,{"query":`{student(id:"${id}"){id firstName lastName email password collegeId}}`});
    }
    create(data){
        return httpCommon.post(this.gqlUrl,{"query":`mutation{createStudent(firstName: "${data.firstName}", lastName: "${data.lastName}",email: "${data.email}", password: "${data.password}", collegeId: "${data.collegeId}"){id firstName lastName email password collegeId}}`});
    }
    update(data){
        return httpCommon.post(this.gqlUrl,{"query":`mutation{updateStudent(id:"${data.id}", firstName: "${data.firstName}", lastName: "${data.lastName}",email: "${data.email}", password: "${data.password}", collegeId: "${data.collegeId}"){id firstName lastName email password collegeId}}`});
    }
    deleteById(id){
        return httpCommon.post(this.gqlUrl,{"query":`mutation{deleteStudent(id:"${id}"){id firstName lastName email password collegeId}}`});
    }
    getCollege(){
        return httpCommon.post(this.gqlUrl,{"query":"{colleges{id name location rating}}"});
    }
}
const stIntance = new StudentService();
export default stIntance;