import React, { Fragment } from 'react';
import { Form, Input, Button, Switch } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const FormTodo = ({ onFinish, checked, onChange }) => {
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Fragment>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name="nametodo" label="Nombre Tarea:" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Completada">
                    <Switch checked={checked} onChange={onChange} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" style={{margin: '25px'}}>
                        Enviar
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Limpiar
                    </Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
}

export default FormTodo;