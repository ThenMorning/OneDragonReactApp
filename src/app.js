import React from "../lib/react";
import Form from "./common/components/Form";
import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.getFormInstance = this.getFormInstance.bind(this);
  }

  getFormInstance(formInstance) {
    this.formInstance = formInstance;
  }

  submitForm() {
    this.formInstance.getValuesWithCheck(null, (errors, values) => {
      console.log(errors, values);
      if (errors && errors.length) {
        return;
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Register With Us</h1>
        {/* 自己的react没有实现ref 拿不到实例 */}
        <Form
          className="form-container"
          options={{
            defaultValues: {
              // UserName: "1234567890",
            },
            onSubmit: this.onSubmit,
            getFormInstance: this.getFormInstance,
          }}
        >
          <Form.Item
            className="form-item"
            options={{
              label: "UserName",
              name: "UserName",
              rules: [
                // {
                //   require: true,
                //   message: "Password2 is required",
                // },
                {
                  checkFn: (v) => v.length >= 3,
                  message: "UserName must be at least 3 characters",
                },
              ],
            }}
          >
            <input type="text" placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            className="form-item"
            options={{
              label: "Email",
              name: "Email",
              rules: [
                {
                  //邮箱规则:以数字或者字母开头,中间可以是多个数字或字母或者下划线或者中划线,之后是@,之后是数字或者字母,最后是"." 加上2-4个字母结尾
                  checkFn: (v) =>
                    /^([a-zA-Z]|[\d])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]){2,4}$/.test(
                      v
                    ),
                  message: "Email is not vaild",
                },
              ],
            }}
          >
            <input type="text" placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            className="form-item"
            options={{
              label: "Password",
              name: "Password",
              rules: [
                {
                  checkFn: (v) => v.length >= 6,
                  message: "Password must be at least 6 characters",
                },
              ],
            }}
          >
            <input type="text" placeholder="Enter password" />
          </Form.Item>
          <Form.Item
            className="form-item"
            options={{
              label: "Confirm Password",
              name: "Password2",
              rules: [
                {
                  require: true,
                  message: "Password2 is required",
                },
                {
                  checkFn: (v, depsValue) => v === depsValue[0],
                  deps: ["Password"],
                  message: "两次不一致",
                },
              ],
            }}
          >
            <input type="text" placeholder="Enter password again" />
          </Form.Item>
          <button onClick={this.submitForm} className="submit-btn">onSubmit</button>
        </Form>
      </div>
    );
  }
}
export default App;
