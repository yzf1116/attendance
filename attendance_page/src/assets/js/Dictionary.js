


export const getDictionary=function(){
                 axios.get('/api/dictionaryRouter/initDictionary', {
                        params: {}
                    })
                    .then(function (response) {
                        console.log(response);
                        // if (response.data.flag) {
                        //     self.btnLoding = false;
                        // } else {
                        //     self.btnLoding = false;
                        //     self.$message({
                        //         message: response.data.data,
                        //         type: 'warning'
                        //     });
                        // }

                        //    self.$router.push('/index');
                    }).catch(function (error) {
                        console.log(error)
                    });
}