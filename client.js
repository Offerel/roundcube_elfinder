window.rcmail && rcmail.addEventListener('init', function(evt) {
	rcmail.register_command('plugin.storage.save_one', save_one, true);
	rcmail.register_command('plugin.storage.add_note', add_note, true);

	rcmail.addEventListener('beforemenu-open', function(p) {
		if (p.menu == 'attachmentmenu') {
			rcmail.env.selected_attachment = p.id;
		}
	});
	
	var fbutton = $("#compose-attachments").contents().find("a.button");                
	fbutton.after("<a class='button' tabindex='2' href='#' onclick='cform();'>" + rcmail.env.elbutton + "</a>");
});

function save_one()
{
	var part = rcmail.env.selected_attachment;
	rcmail.http_post('storage/save_one', '_mbox=' + urlencode(rcmail.env.mailbox) + '&_uid=' + rcmail.env.uid + '&_part=' + part);
}

function add_note()
{
	var title = prompt(rcmail.env.ntitle, '');
	var tags = prompt(rcmail.env.ntags, '');
    
	if (title == null || title == "") {
        return;
    } else {
		rcmail.http_post('storage/add_note', '_title=' + urlencode(title) + '&_tags=' + urlencode(tags));
    }
}

function dmessage(response)
{
	alert(response.message);
}
    
function cform()
{
	var storage_path = rcmail.env.spath;
	var cid = location.search.split('id=')[1];
	var specs = "location=no,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,toolbar=no,width=840,height=370,";
	var elwindow = window.open(storage_path + "elopen.html?id=" + cid,"elopen",specs,false);
}

function elcallback(files,cid,tid)
{
	for (id in files) {
		rcmail.http_post('storage/elattach', '_tid=' + tid + '&_cid=' + cid + '&_file=' + files[id].path);
		}

}