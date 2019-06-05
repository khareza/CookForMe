import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import OrderMethods from '../../../Helpers/OrderMethods';
import { NotificationManager } from 'react-notifications';
import IngredientsWrapper from '../Details/IngredientsWrapper';
import { Error } from '../../Error';

class EditOrderForm extends Component {

    constructor(props) {
        super(props);
        this.OrderRequest = new OrderMethods();

        this.state = {
            expirationDate: new Date(),
            ingredientsPhotoUrl: '',
            ingredientsAvaiableList: '',
            ingredientsPhoto: '',
            description: '',
            isSubmitDisabled: false,
            imagePreviewUrl: '',
            errors: {}
        };
        this.id = this.props.match.params.order_id;

    }

    componentDidMount = () => {
        this.getOrder(this.id);
    }


    getOrder = (id) => {
        this.OrderRequest.getOrderById(id)
            .then((res) => {
                this.setState({
                    ingredientsPhotoUrl: res.data.ingredientsPhotoUrl ? res.data.ingredientsPhotoUrl : 'WithoutPhoto',
                    ingredientsAvaiableList: res.data.ingredientsAvaiable ? res.data.ingredientsAvaiable : ' ',
                    ingredientsPhoto: '',
                    description: res.data.description,
                    isSubmitDisabled: false
                });
            }).catch((err) => {
                this.props.history.push(`/orders/MyOrders`);
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { expirationDate, ingredientsPhoto, ingredientsAvaiableList, description } = this.state;

        const fd = new FormData();
        fd.append('photo', ingredientsPhoto);

        this.OrderRequest.uploadOrderPhoto(fd)
            .then((res) => {
                return this.OrderRequest.editOrder(
                    { orderId: this.id, photoUrl: res.data, expirationDate, ingredientsAvaiableList, description }
            )}).then((res) => {
            NotificationManager.success('Edited order successful', 'Correct');
            this.props.history.push('/orders/MyOrders')
        }).catch((err) => {
            console.log(err.response.data);
            this.handleInputErrors(err.response.data.errors);
            NotificationManager.error('Data not valid', 'Error!');
        });
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
            this.setState({ imagePreviewUrl: '' })
        }
    }

    handleDateChange = (date) => {
        this.setState({ expirationDate: date });
        console.log(this.state.expirationDate);
    }

    saveIngredients = (igredientsString) => {

        this.setState({ ingredientsAvaiableList: igredientsString });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="form-row">
                        <div className="form-gorup col-md-8 offset-md-2">

                            <div className="form-group">
                                <label>Ingredients Avaiable</label>
                                <div>
                                    {this.state.imagePreviewUrl
                                        ? <img className="imgPreview" src={this.state.imagePreviewUrl} alt="empty"></img>
                                        : null}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Expiration date</label>
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
                                        Select new photo
                                    </label>
                                    <input className="inputFileinput" id="file-upload" type="file" name="ingredientsPhoto" onChange={this.handleFileChange} />
                                </div>
                            </div>

                            {this.state.ingredientsAvaiableList.length
                                ? (<div className="form-group">
                                    <label>Ingredients Avaiable List</label>
                                    <IngredientsWrapper saveIngredients={this.saveIngredients} ingredientsList={this.state.ingredientsAvaiableList.split(';')} />
                                </div>)
                                : null
                            }
                            {this.state.errors['IngredientsAvaiableList'] ? <Error messages={this.state.errors['IngredientsAvaiableList']} /> : null}
                            <div className="form-group">
                                <label>Description</label>
                                <input className="form-control" type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                            </div>

                            <input type="submit" value="Edit order data" className="btn btn-large btn-block btn-info" disabled={this.state.isSubmitDisabled} />

                            <input type="button" value="Cancel" onClick={() => { this.props.history.push('/orders/MyOrders') }} className="btn btn-large btn-block btn-danger" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(EditOrderForm);