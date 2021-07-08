import React, { Component } from 'react';
import Identicon from 'identicon.js';
import "./App.css";

class Main extends Component {

  render() {
    return (

      
      <div className="container-fluid mt-4 pt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '480px' }}>
          
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              
              <h2 class="top">Share Image</h2>
           
              <form onSubmit={(event) => {
                event.preventDefault()
                const description = this.imageDescription.value
                this.props.uploadImage(description)
              }} >
                <input type='file' className="text-white bg-info mt-4" accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                  <div className="form-group mr-sm-2">
                    <br></br>
                      <input
                        id="imageDescription"
                        type="text"
                        ref={(input) => { this.imageDescription = input }}
                        className="form-control"
                        placeholder="Image description..."
                        required />
                  </div>
                <button type="submit" class="btn btn-primary btn-block btn-lg">Upload!</button>
              </form>
           
              <p>&nbsp;</p>
              { this.props.images.map((image, key) => {
                return(
                
                  <div className="card mb-4 cardi" key={key} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                      />
                      <small className="text-dark ml-4">{image.author}</small>
                    </div>
                    <ul id="imageList" className="list-group list-group-flush">
                      <li className="list-group-item main">
                        <p className="text-center"><img src={`https://ipfs.infura.io/ipfs/${image.hash}`} style={{ maxWidth: '450px'}}/></p>
                        <p className="text-center">{image.description}</p>
                      </li>
                      <li key={key} className="list-group-item py-2 foot">
                        <small className="float-left mt-1 text-black">
                          TIPS: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                        </small>
                        {/* <button
                          style={{textDecoration :'none'}}
                          className="btn btn-link btn-sm float-right ml-3 pt-0 btn-danger text-white"
                          name={image.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.Delete(event.target.name)
                          }}
                        >
                          Delete 
                        </button> */}
                        <button
                          style={{textDecoration :'none'}}
                          className="btn btn-link btn-sm float-right pt-0 btn-info text-white"
                          name={image.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.tipImageOwner(event.target.name, tipAmount)
                          }}
                        >
                          👍 TIP 0.1 ETH 
                        </button>
                      </li>
                    </ul>
                  </div>
                
                )
              })}
            </div>
          </main>
        </div>
      </div>
      
    );
  }
}

export default Main;