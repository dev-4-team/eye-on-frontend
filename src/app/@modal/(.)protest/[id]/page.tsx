import ProtestPage from '@/app/protest/[id]/page';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function Page(props: any) {
    return (
        <Dialog defaultOpen>
            <DialogContent className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4/5 max-w-lg bg-white rounded-lg shadow-lg overflow-y-auto'>
                <DialogHeader className='hidden'>
                    <DialogTitle>Protest detail dialog</DialogTitle>
                    <DialogDescription>Protest detail dialog</DialogDescription>
                </DialogHeader>
                <ProtestPage {...props} />
            </DialogContent>
        </Dialog>
    );
}
