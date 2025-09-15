export async function admin_perm(to_do) {
    if (typeof to_do === 'function') {
        const result = await window.window_.adminpassword();
        if (result.ok) {
            to_do();
        } else {
            alert('Acces not garanted :c')
        }
    } else {
        console.error('waiting a function not else');
    }
}