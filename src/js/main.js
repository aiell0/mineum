$(document).ready(()=>{



	updateROI("sasharaven")
	
	

	$( "#search-form" ).submit(( event ) => {
	  updateROI($("#search-user").val())
	  event.preventDefault();
	});
	
	

	


	function updateROI(username) {
		//Format username
		username = username.toLowerCase().trim().replace("@", "")
		//No username supplied
		if(username == "") {
			alert("No username supplied")
		} else {
			steem.api.getAccountHistory(username, -1, 10000, (err, result) => {
				if (err) alert (err)
				var finalSpent = 0
				var finalGained = 0
				for (var i = result.length - 1; i >= 0; i--) {
					// console.log(result[i][1].op)
					if(result[i][1].op[0] == "transfer" && (result[i][1].op[1].to=="steemeum" || result[i][1].op[1].from=="steemeum")) {
						if(result[i][1].op[1].to=="steemeum") {
							finalSpent += parseFloat(result[i][1].op[1].amount.replace(" SBD", ""))
						} else if (result[i][1].op[1].from=="steemeum"){
							finalGained += parseFloat(result[i][1].op[1].amount.replace(" SBD", ""))
						}
					}
				}
				$("#steem-spent").text(finalSpent.toFixed(3) + " SBD")
				$("#steem-gained").text(finalGained.toFixed(3) + " SBD")
	          	$("#steem-roi").text(`${finalGained < finalSpent ? (finalGained - finalSpent).toFixed(3) : "+" + (finalGained - finalSpent).toFixed(3)} (${((finalGained / finalSpent) * 100).toFixed(2)}%)`)
	          	$("#steem-roi").addClass(finalGained > finalSpent ? ()=>{ $(this).removeClass("text-red"); return "text-green"} : ()=>{$(this).removeClass("text-green"); return "text-red" })
	          	$("#stats-title").text(`Total SBD received by  ${"@"+username}`) 
	        })
		}
	}
})

