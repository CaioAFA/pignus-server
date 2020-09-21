/*
	THIS FILE REQUIRES JQUERY IN HTML PAGE
*/

// Use only this function
async function showIncidentInfo(idIncident){
	const incidentData = await getIncidentData(idIncident);
	updateModal(incidentData);
	showModal();
}

function getIncidentData(idIncident){
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `/incident/info?idIncident=${idIncident}`);

		xhr.onload = () => {
			if(xhr.status == 200){
				resolve(JSON.parse(xhr.response));
			}
			reject(xhr);
		}

		xhr.send();
	});
}

function updateModal(incidentData){
	document.getElementById('modalIncidentImage').src = `/photo/${incidentData.photo_path}`;
	document.getElementById('modalOriginalIncidentImage').src = `/photo/${incidentData.original_photo_path}`;
	document.getElementById('modalTimestamp').innerHTML = incidentData.timestamp;
	document.getElementById('modalChance').innerHTML = incidentData.chance;
}

function showModal(){
	$('#incidentInfoModal').modal();
}

$(document).ready(() => {
	// Append the modal in page
	document.getElementById('modalPlaceholder').innerHTML = `
	    <div class="modal fade" id="incidentInfoModal" tabindex="-1" role="dialog" aria-labelledby="incidentInfoModalTitle" aria-hidden="true">
	        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
	            <div class="modal-content">
	                <div class="modal-header">
	                    <h5 class="modal-title" id="exampleModalLongTitle">Informações - Incidente</h5>
	                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                        <span aria-hidden="true">&times;</span>
	                    </button>
	                </div>
	                <div class="modal-body">
	                    <div class="row no-gutters justify-content-around">
	                        <div class="col-12 col-lg-5">
	                            Foto:
	                            <img class="w-100 zoom-image" id="modalIncidentImage">
	                        </div>
	                        <div class="col-12 col-lg-5">
	                            Foto Original:
	                            <img class="w-100 zoom-image" id="modalOriginalIncidentImage">
	                        </div>
	                    </div>

	                    <div class="row no-gutters justify-content-center">
	                        <div class="col-12 col-lg-11">
	                            Horário: <span id="modalTimestamp"></span>
	                        </div>
	                        <div class="col-12 col-lg-11">
	                            Chance: <span id="modalChance"></span>
	                        </div>
	                        <div>
	                            
	                        </div>
	                    </div>

	                    <!-- Image Zoom -->
	                    <script type="text/javascript">
	                        $(".zoom-image").elevateZoom({
	                            zoomType: "lens",
	                            lensShape: "round",
	                            lensSize: 100
	                        });
	                    </script>
	                    <style type="text/css">
	                        .zoomContainer{
	                            z-index: 2000;
	                        }
	                    </style>
	                </div>
	                <div class="modal-footer">
	                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
	                </div>
	            </div>
	        </div>
	    </div>
	`
});