import ProtestPage from '@/app/protest/[id]/page';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function Page(props: any) {
    return (
        <Dialog defaultOpen>
            <DialogContent>
                <DialogHeader className="hidden">
                    <DialogTitle>Protest detail dialog</DialogTitle>
                    <DialogDescription>Protest detail dialog</DialogDescription>
                </DialogHeader>
                <ProtestPage {...props} />
            </DialogContent>
        </Dialog>
    );
}
