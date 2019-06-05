import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import IngredientsWrapper from '../Details/IngredientsWrapper';
import AuthMethods from '../../../Helpers/AuthMethods';
import OrderMethods from '../../../Helpers/OrderMethods';
import { NotificationManager } from 'react-notifications';
import { Error } from '../../Error';

export default class AddNewOrder extends Component {
    constructor(props) {
        super(props);

        this.Auth = new AuthMethods();
        this.OrderRequest = new OrderMethods();
        this.state = {
            expirationDate: new Date(),
            ingredientsPhoto: '',
            ingredientsAvaiableList: '',
            description: '',
            imagePreviewUrl: '',
            isSubmitDisabled: false,
            errors: {}
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { expirationDate, ingredientsPhoto, ingredientsAvaiableList, description } = this.state;

        const fd = new FormData();
        fd.append('photo', ingredientsPhoto);

        this.OrderRequest.uploadOrderPhoto(fd)
            .then((res) => {
              return this.OrderRequest.createOrder(
                    { founderId: this.Auth.getUserId(), photoUrl: res.data, expirationDate, ingredientsAvaiableList, description }
                )
            }).then((res) => {
                NotificationManager.success('Created new order', 'Success');
                this.props.history.push('/orders/MyOrders')
            }).catch((err) => {
                NotificationManager.error('Data not valid', 'Error!');
                this.handleInputErrors(err.response.data.errors);
            })
    }

    handleInputErrors = (errors) => {
        let errorsArray = [];
        for (var field in errors) {
            errorsArray[field] = errors[field];
        }
        this.setState({ errors: errorsArray });
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleFileChange = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState(
                {
                    ingredientsPhoto: file,
                    imagePreviewUrl: reader.result
                });
        }
        if (event.target.files[0]) {
            reader.readAsDataURL(file);
        }
        else {
            this.setState({ imagePreviewUrl:''})
        }
    }

    handleDateChange = (date) => {
        this.setState({ expirationDate: date });
    }

    saveIngredients = (igredientsString) => {
        this.setState({ ingredientsAvaiableList: igredientsString });
    }

    render() {
        return (
            <div >
                <form onSubmit={this.handleSubmit} autoComplete="off" encType="multipart/form-data">
                    <div className="headerLogin">
                        <h2 >Add new order</h2>
                    </div>
                    <div>
                        <div className="form-gorup col-md-8 offset-md-2">
                            <div className="form-group">
                                <label>Order expires in</label>
                                <div>
                                    <DatePicker
                                        selected={this.state.expirationDate}
                                        onChange={this.handleDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                    />
                                </div>
                                {this.state.errors['ExpirationDate'] ? <Error messages={this.state.errors['ExpirationDate']} /> : null}
                            </div>

                            <div className="form-group">
                                <label>Ingredient Photo</label>
                                <div>
                                    <label htmlFor="file-upload" className="custom-file-upload">
                                        Select photo
                                    </label>
                                    <input className="inputFileinput" id="file-upload" type="file" name="ingredientsPhoto" onChange={this.handleFileChange} />
                                    <div>
                                        {this.state.imagePreviewUrl
                                            ? <img className="imgPreview" src={this.state.imagePreviewUrl} alt="Select" />
                                            : null}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Ingredients Avaiable List</label>
                                <IngredientsWrapper saveIngredients={this.saveIngredients} ingredientsList={this.state.ingredientsAvaiableList} />
                                {this.state.errors['IngredientsAvaiableList'] ? <Error messages={this.state.errors['IngredientsAvaiableList']} /> : null}
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <input className="form-control" type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                            </div>
                            <input type="submit" value="Add new order" className="btn btn-large btn-block btn-primary" disabled={this.state.isSubmitDisabled} />
                            <input type="button" value="Cancel" onClick={() => { this.props.history.push('/orders/MyOrders') }} className="btn btn-large btn-block btn-danger" />
                        </div>
                    </div>
                </form>
            </div >
        );
    }
}
