-- Run this in your Supabase SQL Editor

-- 1. Ensure the function exists in the 'amigo' schema
create or replace function amigo.get_or_create_profile_thread(other_profile_id uuid)
returns json
language plpgsql
security definer
set search_path = amigo, public
as $$
declare
  current_user_id uuid;
  thread_record record;
begin
  -- Get current user
  current_user_id := auth.uid();
  
  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;

  if current_user_id = other_profile_id then
    raise exception 'Cannot chat with yourself';
  end if;

  -- Check if thread exists
  select * into thread_record
  from amigo.chat_threads
  where kind = 'profile'
    and (
      (profile_one_id = current_user_id and profile_two_id = other_profile_id)
      or
      (profile_one_id = other_profile_id and profile_two_id = current_user_id)
    )
  limit 1;

  -- If exists, return it
  if found then
    return row_to_json(thread_record);
  end if;

  -- If not, create it
  insert into amigo.chat_threads (kind, profile_one_id, profile_two_id)
  values ('profile', current_user_id, other_profile_id)
  returning * into thread_record;

  return row_to_json(thread_record);
end;
$$;

-- 2. Grant permission to authenticated users
grant execute on function amigo.get_or_create_profile_thread(uuid) to authenticated;
