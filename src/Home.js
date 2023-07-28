


import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: [],
            viewArray: [],
            view: [],
            array: [],
            barray: [],
            arrayi: {},
            name: '',
            detail: '',
            price: '',
            textarea: '',
            file: '',
            bimg: '',
            imagePreviewUrl: '',
            newimg: [],
            newimg1: [],
            editdata: '',
            viewdata: '',
            mainImage: '',
            hello: [],
            button: '',
            characters: [],
            newImage: [],
            image: [],
        };
    }

    name = (e) => {
        this.setState({ name: e.target.value });
    };

    detail = (e) => {
        this.setState({ detail: e.target.value });
    };

    price = (e) => {
        this.setState({ price: e.target.value });
    };

    textarea = (e) => {
        this.setState({ textarea: e.target.value });
    };



    edit = (item) => {
        this.setState({
            name: item.name,
            editdata: item.id,
            viewdata: item.id,
            detail: item.detail,
            price: item.price,
            textarea: item.textarea,
            newimg: item.file,
        });
    };

    removeImage = (item) => {
        const bimg = this.state.newimg.filter((ary) => ary !== item);
        this.setState({ newimg: bimg });
        console.log(item);
    };

    remove = (id) => {
        const dataArray = this.state.array.filter((item) => item.id !== id);
        console.log(dataArray);
        this.setState({
            array: dataArray,
            name: '',
            detail: '',
            price: '',
            textarea: '',
            file: '',
            imagePreviewUrl: '',
        });
    };

    update = () => {
        const { editdata, name, detail, price, textarea, newimg } = this.state;
        const objIndex = this.state.array.findIndex((item) => item.id === editdata);

        const updatedItem = {
            ...this.state.array[objIndex],
            name,
            detail,
            price,
            textarea,
            file: newimg,
        };

        const newArray = [...this.state.array];
        newArray[objIndex] = updatedItem;

        this.setState({
            array: newArray,
            name: '',
            detail: '',
            price: '',
            textarea: '',
            file: '',
            imagePreviewUrl: '',
        });
    };

    submit = () => {
        const { name, detail, price, textarea, newimg } = this.state;

        const data = {
            name,
            detail,
            price,
            textarea,
            file: newimg,
            id: Date.now(),
        };

        const dataArray = [...this.state.array, data];

        this.setState({ array: dataArray });

        localStorage.setItem('data', JSON.stringify(dataArray));

        this.setState({
            name: '',
            detail: '',
            price: '',
            textarea: '',
            file: '',
            imagePreviewUrl: '',
            newimg: [],
        });
    };

    sub = () => {
        const { newImage } = this.state;

        const data1 = {

            file: newImage,

        };

        const dArray = [...this.state.barray, data1];

        this.setState({ barray: dArray }, () => {

            this.setState({ test: this.state.barray[0].file }, () => {
                console.log(this.state.test)
            })
        });

    };

    view = (id) => {
        const item = this.state.array.find((item) => item.id === id);

        if (item) {
            this.setState({
                arrayi: item,
                mainImage: item.file[0],
            });
        }
    };

    handleImage = (item) => {
        this.setState({ mainImage: item });
    };

    onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const { newImage } = this.state;
        const reorderedItems = Array.from(newImage);
        const [removed] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, removed);

        console.log({ reorderedItems });
        this.setState({
            newImage: reorderedItems,
        });
    };


    onloadend = (e) => {
        const newimage = [];
        for (let i = 0; i < e.target.files.length; i++) {
            let file = e.target.files[i];
            let reader = new FileReader();

            reader.onloadend = () => {
                newimage.push(reader.result);
                this.setState({
                    newimg: newimage,
                    imagePreviewUrl: reader.result,

                });
            };

            reader.readAsDataURL(file);
        }
    };


    uploadImage = (event) => {
        const files = event.target.files;
        const uploadedImages = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const objectURL = URL.createObjectURL(file);
            uploadedImages.push(objectURL);
        }

        this.setState({
            newImage: uploadedImages,
        });
    };

    getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: 'none',
        padding: '16px',
        margin: '0 0 8px 0',
        background: isDragging ? 'lightgreen' : 'grey',
        ...draggableStyle,
    });

    getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: '8px',
        width: '250px',
    });

    render() {
        const { newImage } = this.state;

        return (
            <section>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <Form.Group className="mt-5">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.name}
                                    placeholder="Product name"
                                />
                            </Form.Group>
                            <Form.Group className="mt-5">
                                <Form.Label>Product Detail</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={this.state.detail}
                                    onChange={this.detail}
                                    placeholder="Product Detail"
                                />
                            </Form.Group>
                            <Form.Group className="mt-5">
                                <Form.Label>Product Price</Form.Label>
                                <Form.Control
                                    type="tel"
                                    value={this.state.price}
                                    onChange={this.price}
                                    placeholder="Product price"
                                />
                            </Form.Group>
                            <Form.Group className="mt-5">
                                <Form.Label>Discription</Form.Label>
                                <Form.Control
                                    type="textarea"
                                    as="textarea"
                                    className="mb-5"
                                    value={this.state.textarea}
                                    onChange={this.textarea}
                                    placeholder="Product textarea"
                                />
                            </Form.Group>
                            <Form.Group className="mt-5">
                                <Form.Label>Product image</Form.Label>
                                <Form.Control
                                    type="file"
                                    value={this.state.file}
                                    multiple
                                    onChange={this.onloadend}
                                    placeholder="Product Image"
                                />
                            </Form.Group>
                            {this.state.newimg.map((item) => {
                                return (
                                    <div>
                                        <img style={{ width: '200px' }} src={item} alt="" />
                                        <button onClick={() => this.removeImage(item)}>X</button>
                                    </div>
                                );
                            })}

                            <Button
                                variant="outline-primary"
                                className="mt-5 mb-3"
                                onClick={this.submit}
                            >
                                Submit
                            </Button>{' '}
                            <Button
                                variant="outline-primary"
                                className="mt-5 mb-3"
                                onClick={this.update}
                            >
                                Update
                            </Button>{' '}
                        </div>
                    </div>
                    <div>
                        <table style={{ border: '1px solid black' }}>
                            <tr>
                                <th>Name</th>
                                <th>Detail</th>
                                <th>Price</th>
                                <th>Textarea</th>
                                <th>Image</th>
                                <th>Remove</th>
                                <th>Edit</th>
                                <th>View</th>
                            </tr>
                            {this.state.array.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.detail}</td>
                                        <td>{item.price}</td>
                                        <td>{item.textarea}</td>
                                        <td>
                                            {' '}
                                            <img
                                                src={item.file[0]}
                                                style={{ width: '200px' }}
                                                alt=""
                                            />{' '}
                                        </td>

                                        <td>
                                            <button onClick={() => this.remove(item.id)}>
                                                Remove
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => this.edit(item)}>Edit</button>
                                        </td>
                                        <td>
                                            <button onClick={() => this.view(item.id)}>View</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>

                    <div>
                        <div>
                            Image:
                            <img
                                src={this.state.mainImage}
                                style={{ width: '200px' }}
                                alt=""
                            />
                            <br></br>
                            {this.state.arrayi.file &&
                                this.state.arrayi.file.map((item) => {
                                    return (
                                        <img
                                            key={item}
                                            onClick={() => this.handleImage(item)}
                                            src={item}
                                            style={{ width: '100px' }}
                                            alt=""
                                        />
                                    );
                                })}
                            <br></br>
                            Name: {this.state.arrayi.name}
                            <br></br>
                            Detail: {this.state.arrayi.detail}
                            <br></br>
                            Price: {this.state.arrayi.price}
                            <br></br>
                            Textarea: {this.state.arrayi.textarea}
                            <br></br>
                        </div>
                    </div>

                    <div>

                        <div className="main_content">
                            <input
                                type="file"
                                multiple
                                onChange={this.uploadImage}
                                id="file"
                            />

                            <div>
                                <DragDropContext onDragEnd={this.onDragEnd}>
                                    <Droppable droppableId="droppable">
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={this.getListStyle(snapshot.isDraggingOver)}
                                            >
                                                {newImage.map((image, index) => (
                                                    <Draggable
                                                        key={"image-" + index}
                                                        draggableId={"image-" + index}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={this.getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style
                                                                )}
                                                            >
                                                                <img
                                                                    src={image}
                                                                    style={{ width: '200px' }}
                                                                    alt=""
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </div>
                            {<button className='mt-3 mb-3' onClick={this.sub}>Sub</button>}
                            {this.state.test.map((item) => {
                                return (
                                    <>


                                        <img src={item} style={{ width: '200px' }} />

                                    </>


                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}