import { List } from 'react-virtualized';
import { useCallback, useState } from 'react';
import { UserDetails } from './UserDetails';

export function UsersList({ data }) {
    const [seletedUser, setSelectedUser] = useState();

    const onUserClick = useCallback((userDetails) => {
        setSelectedUser(userDetails);
    }, []);

    const renderRow = useCallback((item) => {
        const user = data[item.index]
        return (
        <div key={item.key} style={item.style} onClick={() => onUserClick(user)}>
            <span className="clickable">{user.userName} - {user.age}</span>
        </div>
        )
    }, [data, onUserClick]);

    const onDismiss = useCallback(() => {
        setSelectedUser(undefined);
    }, [])

    return (
        <div>
            <h3>Users List</h3>
            <List rowCount={data.length} rowHeight={40} rowRenderer={renderRow} height={500} width={500} />
            {seletedUser && <UserDetails user={seletedUser} onDismiss={onDismiss} />}
        </div>
    )
}