// *****  providers  *****
console.log('providers running..')

/* dependant */





// ***  drive methods
async function sendRequestData(){
  let worker = document.getElementById('worker').value;
  let is_compass = document.getElementById("is_compass").checked;
  let upstair = document.getElementById("upstair").checked;
  let process_id = document.getElementById("process_id").value;
  console.log(filedata,filetype,worker.value)
  console.log(upstair)
  let result = await fetchOauth(process_id,worker,is_compass,upstair);
}
























//
