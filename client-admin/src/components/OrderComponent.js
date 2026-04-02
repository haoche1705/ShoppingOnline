import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Order extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }

  render() {
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          {/* An toàn cho tên và số điện thoại khách hàng */}
          <td>{item.customer?.name || 'N/A'}</td>
          <td>{item.customer?.phone || 'N/A'}</td>
          <td>{item.total}</td>
          <td>{item.status}</td>
          <td>
            {item.status === 'PENDING' ?
              <div>
                <span className="link" onClick={() => this.lnkApproveClick(item._id)}>APPROVE</span> || <span className="link" onClick={() => this.lnkCancelClick(item._id)}>CANCEL</span>
              </div>
              : <div />}
          </td>
        </tr>
      );
    });

    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product?._id || index} className="datatable">
            <td>{index + 1}</td>
            <td>{item.product?._id || 'N/A'}</td>
            {/* Sửa lỗi tại đây: Bảo vệ thuộc tính .name của product */}
            <td>{item.product?.name || 'Sản phẩm không tồn tại'}</td>
            <td>
              {item.product?.image ? 
                <img src={"data:image/jpg;base64," + item.product.image} width="70" height="70" alt="" /> 
                : <div style={{width: 70, height: 70, backgroundColor: '#eee'}} />}
            </td>
            <td>{item.product?.price || 0}</td>
            <td>{item.quantity}</td>
            <td>{(item.product?.price || 0) * item.quantity}</td>
          </tr>
        );
      });
    }

    return (
      <div>
        <div className="align-center">
          <h2 className="text-center">ORDER LIST</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th>ID</th>
                <th>Creation date</th>
                <th>Cust.name</th>
                <th>Cust.phone</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              {orders}
            </tbody>
          </table>
        </div>
        {this.state.order ?
          <div className="align-center">
            <h2 className="text-center">ORDER DETAIL</h2>
            <table className="datatable" border="1">
              <tbody>
                <tr className="datatable">
                  <th>No.</th>
                  <th>Prod.ID</th>
                  <th>Prod.name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
                {items}
              </tbody>
            </table>
          </div>
          : <div />}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetOrders();
  }

  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }

  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }

  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELED');
  }

  // apis
  apiGetOrders() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    }).catch((err) => console.error(err));
  }

  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
      if (res.data) {
        this.apiGetOrders();
      }
    }).catch((err) => console.error(err));
  }
}

export default Order;