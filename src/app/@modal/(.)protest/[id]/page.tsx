// @modal/(.)protest/[id]/page.tsx
import ProtestPage from '@/app/protest/[id]/page';
import ModalWrapper from '@/components/Modal/ModalWrapper';

export default function Page(props: any) {
    return (
        <ModalWrapper>
            <ProtestPage {...props} />
        </ModalWrapper>
    );
}
