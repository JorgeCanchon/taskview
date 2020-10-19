import React, { useState, Fragment, useEffect } from 'react';
import { Table, Button, Spin , message, Popconfirm } from 'antd';
import { GetAll, DeleteTodo, AddTodo } from '../services/todoRequest';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { setTodos, deleteTodo, addTodo } from '../redux/todo/index';
import MyModal from './Modal';
import FormTodo from './FormTodo';

export const Todos = () => {

  const columns = [
    {
      title: 'Id Tarea',
      dataIndex: 'id',
      width: '10%',
    },
    {
      title: 'Nombre Tarea',
      dataIndex: 'title',
      width: '20%',
    },
    {
      title: 'Completada',
      dataIndex: 'completed',
      width: '20%',
    },
    {
      title: 'Eliminar',
      dataIndex: 'Eliminar',
      render: (text, record) =>
          todos.length >= 1 ? (
              <Popconfirm title="¿Esta seguro de eliminar?" onConfirm= { () => handleDelete(record.key)}>
                <a>Eliminar</a>
              </Popconfirm> 
          ) : null,
    }
  ];

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [todoState, setTodoState] = useState([]);

  const onChangeSwitch = e => {
      setChecked(e);
  }
  const dispatch = useDispatch();

  const { todos } = useSelector(
    state => ({
      todos: state.todos.todos
    }),
    shallowEqual
  );

  useEffect(() => {
    getDataTodo();
  }, []);

  const getDataTodo = async () => {
    let data = await GetAll();
    switch(data.status){
      case 200:
        data = data.data.map(x => ({ ...x, key: x.id, completed: x.completed ? 'SI': 'NO'}
        ));
        setTodoState(data);
        dispatch(setTodos(data));
        break;
      case 204:
        message.warning('No se encontraron tareas');
        break;
      default:
        message.error('Ocurrio un error al consultar los datos');
    }
    setLoading(false);
  }

  const handleDelete = async key => {    
    let res = await DeleteTodo(key);
    console.log(res);
    if(res.status === 200){
      message.success('Tarea eliminada con éxito');
      let data = todoState.filter(x => x.id !== key);
      setTodoState(data);
      dispatch(deleteTodo(key));
    }else{
      message.error('Ocurrio un error al eliminar la tarea');
    }
  }

  const handleAdd = _ => {
    setVisible(true);
  }

  const handleOk = async e => {
    let entity =  {
      "userId": 1,
      "title": e.nametodo,
      "completed": checked
    };
    let res = await AddTodo(entity);
    switch(res.status){
      case 200:
      case 201:
        let data = { 
          id: res.data.id,
          title: res.data.title, 
          completed: res.data.completed ? 'SI': 'NO',
          key: res.data.id
        };
        setTodoState([...todoState, data]);
        dispatch(addTodo(data));
        message.success('Tarea agregada con éxito');
        break;
        default:
          message.error('Ocurrio un error al agregar la tarea');
    }
    setVisible(false);
  }

  const handleCancel = _ => {
    setVisible(false);
  };

  if (loading)
      return(
      <Fragment>
          <Spin />
      </Fragment>);
  return (
    <Fragment>
      <Button onClick={handleAdd} type='primary' style ={{marginBottom:16}}>
        Agregar Tarea
      </Button>
      <MyModal 
        title='Agregar Tarea'
        content={<FormTodo onFinish={handleOk.bind(this)} checked={checked} onChange={onChangeSwitch} />}
        visible={visible}
        handleCancel={handleCancel.bind(this)}
       />
      <Table columns={columns} dataSource={todoState} rowKey="id" />
    </Fragment>
  );
}

export default Todos;