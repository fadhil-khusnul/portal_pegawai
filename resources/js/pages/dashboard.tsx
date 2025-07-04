/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Column } from 'primereact/column';
import { useEffect, useRef, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { Message } from 'primereact/message';
import { router } from '@inertiajs/react';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';
import { Password } from 'primereact/password';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { Select } from '@radix-ui/react-select';
import { Dropdown } from 'primereact/dropdown';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];





// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Dashboard({ dataPegawaiTiran, search, roles }: any) {
    console.log('dataPegawaiTiran', roles);
    const [data, setData] = useState(dataPegawaiTiran?.data || []);
    console.log(data);
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', email: '', no_telepon: '', jabatan: '', role_id: null });
    const [editMode, setEditMode] = useState(false);
    const [errors, setErrors] = useState({});

    const toast = useRef(null);
    const [loadingButton, setLoadingButton] = useState(false);


    // Pagination state
    const [first, setFirst] = useState((dataPegawaiTiran?.meta.current_page - 1) * dataPegawaiTiran?.meta.per_page || 0);
    const [rows, setRows] = useState(dataPegawaiTiran?.meta.per_page);

    useEffect(() => {
        setData(dataPegawaiTiran?.data || []);
        setFirst((dataPegawaiTiran?.meta.current_page - 1) * dataPegawaiTiran?.meta.per_page || 0);
        setRows(dataPegawaiTiran?.meta.per_page);


    }, [dataPegawaiTiran]);













    const renderHeader = () => (
        <div className="flex justify-between items-center gap-2 w-full">
            <div>
                <Button label="Tambah Data" icon="pi pi-plus" size='small' onClick={() => handleOpenModal()} />


            </div>



        </div>
    );

    const handleOpenModal = (data = { id: null, name: '', email: '', no_telepon: '', jabatan: '', role_id: null }) => {
        setFormData(data);
        setEditMode(!!data.id);
        setErrors({});
        setOpenModal(true);
    };

    const handleCloseModal = () => setOpenModal(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    };


    const validate = () => {
        const err = {
            nama: '',
            email: '',
            no_telepon: '',
            jabatan: '',
            role_id: '',

        };
        if (!formData.nama) err.nama = 'Nama wajib diisi';
        if (!formData.email) err.email = 'Email wajib diisi';
        if (!formData.no_telepon) err.no_telepon = 'No. Telp wajib diisi';
        if (!formData.jabatan) err.jabatan = 'Jabatan wajib diisi';
        if (!formData.role_id) err.role_id = 'Role wajib dipilih';

        return err;
    };

    const handleSubmit = () => {
        const err = validate();
        setLoadingButton(true);

        if (editMode) {
            router.put(`/data-pegawai/${formData.id}`, formData, {
                onError: (err) => {
                    setErrors(err);
                    setLoadingButton(false);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: Object.values(err).join(', '), life: 4000 });
                },
                onSuccess: () => {
                    toast.current.show({ severity: 'success', summary: 'Sukses', detail: 'Data Pegawi berhasil diupdate', life: 3000 });
                    handleCloseModal();
                    setLoadingButton(false);
                },
            });
        } else {
            router.post('/data-pegawai', formData, {
                onError: (err) => {
                    setErrors(err);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: Object.values(err).join(', '), life: 4000 });

                    setLoadingButton(false);
                },
                onSuccess: () => {
                    toast.current.show({ severity: 'success', summary: 'Sukses', detail: 'Data Pegawai berhasil ditambahkan', life: 3000 });
                    setLoadingButton(false);
                    handleCloseModal();
                },
            });
        }
    };


    // ConfirmDialog for delete
    const handleDelete = (user: any) => {
        confirmDialog({
            message: `Yakin ingin menghapus pegawai "${user.id}"?`,
            header: 'Konfirmasi Hapus',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Ya',
            rejectLabel: 'Tidak',
            accept: () => {
                router.delete(`/data-pegawai/${user.id}`, {
                    onSuccess: () => {
                        toast.current.show({ severity: 'success', summary: 'Sukses', detail: 'dataPegawai berhasil dihapus', life: 3000 });
                    },
                    onError: (err) => {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: Object.values(err).join(', '), life: 4000 });
                    }
                });
            }
        });
    };

    const header = renderHeader();

    const onPage = (event: any) => {
        const page = event.page + 1;
        router.get(dataPegawaiTiran?.meta.path, { page, per_page: event.rows }, { preserveState: true });
    };

    const actionsBodyTemplate = (rowData) => (
        console.log('rowData', rowData),



        <div className="flex gap-2">
            <Button icon="pi pi-pencil" rounded text severity="info" onClick={() => handleOpenModal(rowData)} />
            <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => handleDelete(rowData)} />
        </div>
    );

    console.log(formData);




    return (
        <>


            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />

                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">


                    <DataTable
                        value={data}
                        lazy
                        paginator
                        first={first}
                        rows={rows}
                        totalRecords={dataPegawaiTiran?.meta.total}
                        onPage={onPage}
                        dataKey="id"
                        globalFilterFields={['name', 'email', 'no_telepon']}
                        header={header}
                        emptyMessage="Tidak ada data ditemukan."
                    // onFilter={e => onFilter(e, e.filters)}

                    >
                        <Column
                            header="No"
                            body={(_, { rowIndex }) =>
                                (rowIndex + 1)
                            }
                            style={{ minWidth: '4rem' }}
                        />

                        <Column field="nama" header="Nama" filter filterPlaceholder="Cari nama" style={{ minWidth: '10rem' }} />
                        <Column field="email" header="Email" filter filterPlaceholder="Cari Email" style={{ minWidth: '10rem' }} />
                        <Column field="no_telepon" header="No Telepon" filter filterPlaceholder="Cari No Telepon" style={{ minWidth: '10rem' }} />
                        <Column field="jabatan" header="Jabatan" filter filterPlaceholder="Cari Jabatan" style={{ minWidth: '10rem' }} />
                        <Column field="roles.nama" header="Role" filter filterPlaceholder="Cari Role" style={{ minWidth: '10rem' }} />

                        <Column header="Actions" body={actionsBodyTemplate} style={{ minWidth: '10rem' }} />
                    </DataTable>
                </div>







            </AppLayout>

            <Toast ref={toast} />
            <ConfirmDialog />

            <Dialog
                header={editMode ? 'Edit Pegawai' : 'Tambah Pegawai'}
                visible={openModal}
                style={{ width: '400px' }}
                onHide={handleCloseModal}
                modal
            >
                <div className="flex flex-col gap-3">
                    <InputText
                        placeholder="Nama"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        className={errors.nama ? 'p-invalid' : ''}
                    />
                    {errors.nama && <Message severity="error" text={errors.nama} />}
                    <InputText
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'p-invalid' : ''}
                    />
                    {errors.email && <Message severity="error" text={errors.email} />}
                    <InputText
                        placeholder="No. Telp"
                        name="no_telepon"
                        value={formData.no_telepon}
                        onChange={handleChange}
                        className={errors.no_telepon ? 'p-invalid' : ''}
                    />
                    {errors.no_telepon && <Message severity="error" text={errors.no_telepon} />}

                    <InputText
                        placeholder="Jabatan"
                        name="jabatan"
                        value={formData.jabatan}
                        onChange={handleChange}
                        className={errors.jabatan ? 'p-invalid' : ''}
                    />
                    <Dropdown value={formData.role_id || formData?.roles.id} onChange={(e) => setFormData({ ...formData, role_id: e.value })} options={roles} optionLabel="nama" optionValue="id"
                        placeholder="Select a role" className="w-full md:w-14rem" />




                    <Button label="Submit" onClick={handleSubmit} loading={loadingButton} />
                </div>
            </Dialog>
        </>


    );
}
