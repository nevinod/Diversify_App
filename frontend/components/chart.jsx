import React from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import request from 'superagent';
import Chart from 'chart.js'
import merge from 'lodash/merge'
import Correlation from 'node-correlation'

// ${Math.floor(Math.random() * 200)}
let practice = []

const data = {
  labels: [],
  datasets: [
    {
      label: 'Data One',
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 4,
      pointRadius: 1,
      pointBorderWidth: 1,
      pointHoverBorderWidth: 3,
      pointHitRadius: 5,
      yAxisID: 'A',
      data: []
    }, {
      label: 'Data Two',
      lineTension: 0.5,
      backgroundColor: 'rgba(181, 61, 103, 0.2)',
      borderColor: 'rgba(181, 61, 103, 1)',
      borderWidth: 4,
      pointRadius: 1,
      pointBorderWidth: 1,
      pointHoverBorderWidth: 3,
      pointHitRadius: 5,
      yAxisID: 'B',
      data: []
    }

  ]
};

const allCoins = [
  'BTC', 'ETH', 'XRP', 'BCH', 'LTC', 'ADA', 'XLM', 'NEO', 'EOS', 'XMR',
  'DASH', 'NEM', 'LSK', 'ETC', 'QTUM', 'OMG', 'ZEC', 'STEEM', 'BNB',
  'BCN', 'PPT', 'STRAT', 'XVG', 'SC', 'DOGE', 'WAVES', 'SNT', 'BTS',
  'WTC', 'ZRX', 'REP', 'AE', 'VERI', 'DCR', 'HSR', 'KMD', 'ARDR', 'ZCL',
  'ARK', 'DGD', 'GAS', 'BAT', 'LRC', 'KNC', 'BTM', 'PIVX', 'GNT','SYS',
  'PLR', 'FCT', 'LINK', 'PAY', 'BNT', 'PART', 'REQ', 'MAID', 'XZC',
  'KIN', 'ENG', 'NXT', 'SALT', 'FUN', 'CND', 'AION', 'SAN',
  'QSP', 'VTC', 'ICN', 'GNO', 'SUB', 'CVC', 'RDN', 'ZEN', 'NXS', 'ANT',
  'TNT', 'AMB', 'MLN', 'SNGLS', 'MTL', 'SNM', 'AST', 'MOD', 'QRL',
  'RPX', 'VEE', 'NAV', 'MANA', 'EMC', 'DNT', 'ION', 'COSS', 'ONION',
  'GRS', 'TAAS', 'DCT', 'VIBE', 'HST', 'LUN', 'UNO', 'EVX', 'DLT',
  'BCC', 'SHIFT', 'MTH', 'NMR', 'DNA', 'AIR', 'STX', 'XRL', 'CSNO'
  ]

const options = {
      title: {
        display: true,
        text: 'DIVERSIFY!',
        fontSize: 50,
        fontFamily: 'Helvetica',
        fontStyle: 300,
      },
      layout: {
        padding: {
                left: 180,
                right: 180,
                top: 25,
                bottom: 50
        }
      },
      scales: {
        yAxes: [{
          id: 'A',
          type: 'linear',
          position: 'left',
        }, {
          id: 'B',
          type: 'linear',
          position: 'right'
        }]
    }
}

class Graph extends React.Component {
   constructor(props) {
     super(props)
     this.state = { Data: [] , Symbol: '', Coins: [], Lowest : 1, Winner: '', tempData: [] }
     this.data = []
   }

   labelArray() {
     let arr = []
     for(let i = 60; i > -1; i--) {
       if(i % 10 !== 0) {
         arr.push('')
       } else {
         arr.push(i)
       }
     }
     return arr
   }

   componentWillMount() {
     let url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + 'BTC' + '&tsym=USD&limit=60&aggregate=3&e=CCCAGG'
     let that = this
     request.get(url, (err, res) => {
       if (err) throw err;

       that.state.Data = res.body.Data

       that.setState({ Data: that.state.Data });
     });
   }

   update(field) {
     return(e) => {
       this.setState({[field]: e.target.value})
     }
   }

   componentWillReceiveProps(newProps) {
     this.setState(newProps.Symbol)

   }


   handleSubmit(e) {
     this.setState({ Lowest: 1.5 , Winner: ''} )
     e.preventDefault()
     let url = `https://min-api.cryptocompare.com/data/histoday?fsym=${this.state.Symbol}&tsym=USD&limit=60&aggregate=3&e=CCCAGG`
     let that = this
     request.get(url, (err, res) => {
       if (err) throw err;
       that.state.Data = res.body.Data
       that.setState({ Data: that.state.Data });
     });

     let testArr = []
     let inputArr = []
     let best = 1.5
     for(let i = 0; i < allCoins.length; i++) {

       url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + allCoins[i] + '&tsym=USD&limit=60&aggregate=3&e=CCCAGG'
       let that = this

       request.get(url, (err, res) => {
         if (err) throw err;
         that.state.Coins = res.body.Data
         testArr = []
         inputArr = []
         for(let j = 0; j < res.body.Data.length; j++) {
           if(that.state.Data[j]) {
             inputArr.push(that.state.Data[j].close)
             testArr.push(res.body.Data[j].close)
           }
         }
         // console.log(allCoins[i]);
         // console.log(testArr);

         let temp = Correlation.calc(testArr, inputArr);
         // console.log(temp);
         if(parseFloat(temp) < parseFloat(that.state.Lowest)) {
           console.log("LOWER");
           that.setState({ Winner: allCoins[i] , Lowest: temp, tempData: testArr })

         }

         // console.log("STATE:");
         // console.log(that.state);

       })


     }







   }

  render() {
    // console.log(this.state.Coins);



    if(this.state.Data.length > 1) {
      let l = this.state.Data.length
      let dArray = []
      for(let i = 0; i < this.state.Data.length; i++) {
          dArray.push(this.state.Data[i].close)
      }
      data.datasets[0].data = dArray
      data.datasets[1].data = this.state.tempData
    }
    data.labels = this.labelArray()

    console.log("STATE:");
    console.log(this.state);



    return (
      <div className="chart">
        <Line data={data} options={options} />


        <form className="coin-form" onSubmit={e => this.handleSubmit(e)} >
          <label>
            <input
              type="text"
              className="coin-input"
              value={this.state.Symbol}
              onChange={this.update('Symbol')}
              placeholder="Coin symbol" />
          </label>
          <input type="submit" className="search-coin" value="Search" />
        </form>
        <h2 className="result-coin">Suggested Coin : </h2>
        <h3 className="result-coin">{this.state.Winner}</h3>
        <p className="explanation">Please enter the coin you own in the input field (all caps please, i.e. BTC or ETH). This app will find a coin in the top 100 that is
        least correlated with your coin, allowing you to diversify your crypto investment. Please refresh before entering another coin </p>

      </div>
    )
  }
}

export default Graph;
