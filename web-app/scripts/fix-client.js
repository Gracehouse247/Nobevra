const fs = require('fs');
let code = fs.readFileSync('src/components/clients/NewClientForm.tsx', 'utf8');

const goodTop = `export function NewClientForm({ isModal, onSuccess, onCancel }: { isModal?: boolean, onSuccess?: (client: any) => void, onCancel?: () => void }) {
    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const fromInvoice = searchParams?.get('from') === 'invoice';
    const [loading, setLoading] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        country: '',
        country_code: '+234',
        address: '',
        company: '',
        position: '',
        website: '',
        tags: '',
        lead_status: 'lead',
        notes: ''
    });

    const handleSubmit = async (e: React.FormEvent, redirectToInvoice = false) => {
        e.preventDefault();
        if (!user) return;
        
        setLoading(true);
        try {
            const tData = await teamService.getTeamByUserId(user.id);
            const teamId = tData?.id || user.id;

            // Map frontend form data to valid database columns
            const clientPayload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                country: formData.country,
                country_code: formData.country_code,
                address: formData.address,
                business_name: formData.company,
                position: formData.position,
                website: formData.website,
                lead_status: formData.lead_status,
                team_id: teamId,
                user_id: user.id
            };

            const saved = await clientService.createClient(clientPayload);`;

const firstExport = code.indexOf('export function NewClientForm');
const lastSaved = code.indexOf('const saved = await clientService.createClient(clientPayload);') + 'const saved = await clientService.createClient(clientPayload);'.length;

code = code.substring(0, firstExport) + goodTop + code.substring(lastSaved);
fs.writeFileSync('src/components/clients/NewClientForm.tsx', code);
console.log('Fixed NewClientForm.tsx');
