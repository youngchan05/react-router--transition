$(document).ready(() =>{

    let myDB;   // DB 변수

    // Console.log && alert 함수
    const showMsg = (msg) =>{
        console.log(msg);
        alert(msg);
    };

    // 쿼리 실행
    const executeQuery = (query, stmt = []) => {

        return new Promise((resolve, reject) => {
            console.log(`ExecuteQuery => ${query}`);

            myDB.transaction((transaction) => {
                transaction.executeSql(query, stmt,
                    (tx, result) => {
                        resolve(result);
                    },
                    (error) => {
                        console.log("ExecuteQuery 실패");
                    }
                );
            },
            (error) => {
                reject(`SQL Error => \n${error.message}`);
            });
        });
    };

    // Init Database
    const initDatabase = () => {
        myDB = window.sqlitePlugin.openDatabase(
            {name: "test.db", location: 'default'}
        );

        console.log(`myDB=> ${myDB}`);

        let query = "CREATE TABLE IF NOT EXISTS WISH_LIST_TB (key text NOT NULL, indate text NOT NULL DEFAULT (datetime('now', 'localtime')))";
        
        executeQuery(query).then((resolvedData) => {
            console.log("Database Init Success!!");
        }).catch((error) => {
            showMsg(error);
        });
    };
    

    // 테이블 컬럼 확인
    const checkTableColumn = () => {
        return new Promise((resolve, reject) => {
            let query = "SELECT sql FROM sqlite_master WHERE name='WISH_LIST_TB'";
            
            executeQuery(query).then((resolvedData) => {
                let len = resolvedData.rows.length;

                for (i = 0; i < len; i++){
                    alert(resolvedData.rows.item(i).sql);
                }
            }).catch((error) => {
                showMsg(error);
            });
        });
    };

    // 테이블 제거
    const dropTable = () => {
        return new Promise((resolve, reject) => {
            let query = "DROP TABLE WISH_LIST_TB";
            
            executeQuery(query).then((resolvedData) => {
                showMsg("테이블 제거 성공");
            }).catch((error) => {
                showMsg(error);
            });
        });
    };

    // INSERT
    const insertData = (key) => {
        // 빈값 들어올때
        if (!key){
            showMsg("key값이 입력되지 않음");
            return;
        }

        selectData(key).then((resolvedData) => {
            if (resolvedData.length == 0){
                return new Promise((resolve, reject) => {
                    let insertQuery = "INSERT INTO WISH_LIST_TB (key) VALUES (?)";
                    
                    executeQuery(insertQuery, [key]).then((resolvedData) =>{
                        showMsg("저장 성공");
                    }).catch((error) => {
                        showMsg(error);
                    })
                });
            }
            else{
                for(data of resolvedData){
                    alert(`${data.key} : ${data.indate}`);
                }
            }
        });
    };

    // SELECT
    const selectData = (key) => {
        return new Promise((resolve, reject) => {
            let dataList = new Array();
            let query = "SELECT * FROM WISH_LIST_TB WHERE key LIKE ?";
            let keyData = key || "%";

            executeQuery(query, [keyData]).then((resolvedData) => {
                let len = resolvedData.rows.length;

                for (i = 0; i < len; i++){
                    let key = resolvedData.rows.item(i).key;
                    let indate = resolvedData.rows.item(i).indate;
                    let result = `${i}번째 데이터 => key : ${key}, indate : ${indate}`;
                    console.log(result);

                    let data = new Object();
                    data.key = key;
                    data.indate = indate;

                    dataList.push(data);
                }

                JSON.stringify(dataList);
                resolve(dataList);
            }).catch((error) => {
                showMsg(error);
            });
        });
    };

    // Delete
    const deleteData = (key) => {
        // 빈값 들어올때
        if (!key){
            showMsg("key값이 입력되지 않음");
            return;
        }
        return new Promise((resolve, reject) => {
            let query = "DELETE FROM WISH_LIST_TB WHERE key=?";
            executeQuery(query, [key]).then((resolvedData) => {
                showMsg("삭제 성공");
            }).catch((error) => {
                showMsg(error);
            });
        });
    };

    // 장치가 로드되면 initDatabase 메서드 호출
    document.addEventListener("deviceready", initDatabase, false);


    // ===============================================================

    // 테이블 컬럼 확인
    $("#checkColumn").click(() =>{
        checkTableColumn();
    });

    // 테이블 제거
    $("#dropTable").click(() =>{
        dropTable();
    });

    // SELECT 테스트
    $("#checkData").click(() => {
        let keyData = $('#keyData').val();      // 입력한 key값

        selectData(keyData).then((resolvedData) =>{
            if (resolvedData.length == 0){
                alert("데이터가 존재하지 않습니다.");
            }
            else{
                for(data of resolvedData){
                    alert(`${data.key} : ${data.indate}`);
                }
            }
        });
    });

    // INSERT 테스트
    $("#insertData").click(() => {
        let keyData = $('#keyData').val();      // 입력한 key값

        insertData(keyData);
    });

    // DELETE 테스트
    $("#deleteData").click(() =>{
        let keyData = $('#keyData').val();      // 입력한 key값

        deleteData(keyData);
    });
});