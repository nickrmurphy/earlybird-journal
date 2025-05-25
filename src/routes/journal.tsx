import {FC, PropsWithChildren} from 'react';

interface JournalRouteProps extends PropsWithChildren {
    journalId: string;
}

export const JournalRoute: FC<JournalRouteProps> = ({ journalId }) => {

    return (
        <div>
            {journalId}
        </div>
    );
};

