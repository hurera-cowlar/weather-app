export const tempOptions = {
  responsive: true,

  scales: {
    y: {
      display: true,
      title: {
        display: true,
        text: 'Temperature (C)'
      },
      grid: {
        color: '#1d1d1d',
        backgroundColor: 'white'
      },
      min: -60,
      max: 60,
      ticks: {
        stepSize: 10,
        maxTicksLimit: 12
      }
    },
    x: {
      display: true,
      title: {
        display: true,
        text: 'Date & Time'
      },

      grid: {
        color: '#1d1d1d'
      }
    }
  }
}
export const humidityOptions = {
  responsive: true,
  scales: {
    y: {
      display: true,
      title: {
        display: true,
        text: 'Humidity ( g.m-3)'
      },
      grid: {
        color: '#1d1d1d',
        backgroundColor: 'white'
      },
      min: 0,
      max: 100,
      ticks: {
        stepSize: 10,
        maxTicksLimit: 10
      }
    },
    x: {
      display: true,
      title: {
        display: true,
        text: 'Date & Time'
      },

      grid: {
        color: '#1d1d1d'
      }
    }
  }
}
export const weatherCondOptions = {
  responsive: true
}
